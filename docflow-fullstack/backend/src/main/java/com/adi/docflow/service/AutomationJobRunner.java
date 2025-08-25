package com.adi.docflow.service;

import com.adi.docflow.model.AutomationJob;
import com.adi.docflow.service.processor.JobProcessor;
import com.adi.docflow.job.JobType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class AutomationJobRunner {

    private static final Logger log = LoggerFactory.getLogger(AutomationJobRunner.class);

    private final AutomationJobService service;
    private final Map<JobType, JobProcessor> processors = new EnumMap<>(JobType.class);

    public AutomationJobRunner(AutomationJobService service, java.util.List<JobProcessor> processorsList) {
        this.service = service;
        for (JobProcessor p : processorsList) {
            processors.put(p.getType(), p);
        }
    }

    @Scheduled(fixedDelay = 5000L, initialDelay = 3000L)
    public void dequeueAndRun() {
        List<AutomationJob> pending = service.fetchPending(10);
        for (AutomationJob job : pending) {
            JobProcessor processor = processors.get(job.getType());
            if (processor == null) {
                service.markFailed(job, "Processor não encontrado para tipo: " + job.getType());
                continue;
            }
            try {
                service.markRunning(job);
                processor.process(job);
                service.markSuccess(job);
            } catch (Exception e) {
                log.error("Falha ao executar job {}: {}", job.getUuid(), e.getMessage(), e);
                service.markFailed(job, e.getMessage());
            }
        }
    }
}
