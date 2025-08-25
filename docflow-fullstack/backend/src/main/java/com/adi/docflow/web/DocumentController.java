package com.adi.docflow.web;

import com.adi.docflow.model.Document;
import com.adi.docflow.model.Project;
import com.adi.docflow.repository.DocumentRepository;
import com.adi.docflow.repository.ProjectRepository;
import com.adi.docflow.web.dto.ImportDocumentDTO;
import com.adi.docflow.web.dto.ImportReportDTO;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/documents")
public class DocumentController {

    private final DocumentRepository docRepo;
    private final ProjectRepository projectRepo;

    public DocumentController(DocumentRepository docRepo, ProjectRepository projectRepo) {
        this.docRepo = docRepo;
        this.projectRepo = projectRepo;
    }

    // ... (seus outros endpoints aqui)

    @PostMapping("/import")
    @Transactional
    public ResponseEntity<ImportReportDTO> importBatch(@RequestBody List<ImportDocumentDTO> payload) {
        if (payload == null || payload.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        final List<ImportReportDTO.RowError> errors = new ArrayList<>();
        final List<Document> toPersist = new ArrayList<>();

        // normaliza e valida mínimos
        final Set<Long> projectIds = payload.stream()
                .map(ImportDocumentDTO::projectId)
                .filter(Objects::nonNull)
                .collect(java.util.stream.Collectors.toSet());

        final Map<Long, Project> projectById = projectRepo.findAllById(projectIds).stream()
                .collect(java.util.stream.Collectors.toMap(Project::getId, p -> p));

        final Set<String> seenInPayload = new HashSet<>();

        for (int idx = 0; idx < payload.size(); idx++) {
            ImportDocumentDTO row = payload.get(idx);

            Long pid   = row.projectId();
            String code  = row.code();
            String title = row.title();

            // --- parse revision (String -> int), default = 1
            Integer rev = row.revision(); // Integer ou null
            int revInt = (rev == null) ? 1 : rev.intValue();
            if (revInt <= 0) {
                errors.add(new ImportReportDTO.RowError(idx, pid, code, revInt, "revision deve ser > 0"));
                continue;
            }
            

            // validações básicas
            if (pid == null) {
                errors.add(new ImportReportDTO.RowError(idx, null, code, revInt, "projectId é obrigatório"));
                continue;
            }
            if (code == null || code.isBlank()) {
                errors.add(new ImportReportDTO.RowError(idx, pid, null, revInt, "code é obrigatório"));
                continue;
            }
            if (title == null || title.isBlank()) {
                errors.add(new ImportReportDTO.RowError(idx, pid, code, revInt, "title é obrigatório"));
                continue;
            }
            if (!projectById.containsKey(pid)) {
                errors.add(new ImportReportDTO.RowError(idx, pid, code, revInt, "projectId não existe"));
                continue;
            }
            if (revInt <= 0) {
                errors.add(new ImportReportDTO.RowError(idx, pid, code, revInt, "revision deve ser > 0"));
                continue;
            }

            // duplicado no payload
            String dupKey = pid + "||" + code.trim().toUpperCase() + "||" + revInt;
            if (!seenInPayload.add(dupKey)) {
                errors.add(new ImportReportDTO.RowError(idx, pid, code, revInt,
                        "duplicado no payload (mesmo projeto+code+revision)"));
                continue;
            }

            // já existe no banco (project+code+revision)
            if (docRepo.existsByProjectIdAndCodeAndRevision(pid, code, String.valueOf(revInt))) {
                errors.add(new ImportReportDTO.RowError(idx, pid, code, revInt,
                        "já existe no banco (mesmo projeto+code+revision)"));
                continue;
            }

            // regra: revisão > máx existente (numérica) para o mesmo code no projeto
            int maxExisting = docRepo.findByProjectIdAndCode(pid, code).stream()
                    .map(Document::getRevision) // String
                    .filter(Objects::nonNull)
                    .map(s -> {
                        try { return Integer.parseInt(s.trim()); }
                        catch (NumberFormatException ex) { return 0; }
                    })
                    .max(Integer::compareTo)
                    .orElse(0);

            if (revInt <= maxExisting) {
                errors.add(new ImportReportDTO.RowError(
                        idx, pid, code, revInt,
                        "revision (" + revInt + ") não pode ser <= máx existente (" + maxExisting + ")"
                ));
                continue;
            }

            // monta entidade
            Document d = new Document();
            d.setProject(projectById.get(pid));
            d.setCode(code);
            d.setTitle(title);
            d.setRevision(String.valueOf(revInt)); // entidade usa String

            toPersist.add(d);
        }

        if (!toPersist.isEmpty()) {
            docRepo.saveAll(toPersist);
        }

        ImportReportDTO report = new ImportReportDTO(
                payload.size(),
                toPersist.size(),
                payload.size() - toPersist.size(),
                errors
        );
        return ResponseEntity.ok(report);
    }
}
