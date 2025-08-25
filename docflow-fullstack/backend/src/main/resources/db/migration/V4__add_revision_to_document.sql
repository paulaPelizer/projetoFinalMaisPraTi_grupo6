-- V4: garantir coluna revision e índice único (idempotente)

-- 1) Se NÃO existir a coluna, cria como NULL, preenche, e torna NOT NULL
IF COL_LENGTH('app.document','revision') IS NULL
BEGIN
    ALTER TABLE app.document ADD revision INT NULL;

    UPDATE app.document SET revision = 1 WHERE revision IS NULL;

    ALTER TABLE app.document ALTER COLUMN revision INT NOT NULL;

    -- Adiciona default constraint se não existir
    IF NOT EXISTS (
        SELECT 1
        FROM sys.default_constraints dc
        JOIN sys.columns c ON c.default_object_id = dc.object_id
        WHERE dc.parent_object_id = OBJECT_ID('app.document')
          AND c.name = 'revision'
    )
    BEGIN
        EXEC(N'ALTER TABLE app.document ADD CONSTRAINT DF_document_revision DEFAULT(1) FOR revision;');
    END
END
ELSE
BEGIN
    -- 2) Se JÁ existir, garantir NOT NULL + default
    IF EXISTS (
        SELECT 1
        FROM sys.columns
        WHERE object_id = OBJECT_ID('app.document')
          AND name = 'revision'
          AND is_nullable = 1
    )
    BEGIN
        UPDATE app.document SET revision = ISNULL(revision, 1) WHERE revision IS NULL;
        ALTER TABLE app.document ALTER COLUMN revision INT NOT NULL;
    END

    IF NOT EXISTS (
        SELECT 1
        FROM sys.default_constraints dc
        JOIN sys.columns c ON c.default_object_id = dc.object_id
        WHERE dc.parent_object_id = OBJECT_ID('app.document')
          AND c.name = 'revision'
    )
    BEGIN
        EXEC(N'ALTER TABLE app.document ADD CONSTRAINT DF_document_revision DEFAULT(1) FOR revision;');
    END
END;

-- 3) Índice único (só cria se não existir)
IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'UX_document_project_code_revision'
      AND object_id = OBJECT_ID('app.document')
)
BEGIN
    CREATE UNIQUE INDEX UX_document_project_code_revision
    ON app.document (project_id, code, revision);
END;
