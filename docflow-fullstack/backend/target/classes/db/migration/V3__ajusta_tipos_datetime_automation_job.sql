-- Ajusta app.automation_job.*_at para datetimeoffset(6)

IF SCHEMA_ID('app') IS NULL EXEC('CREATE SCHEMA app');
GO

-- Drop default constraint de created_at (nome aleatório) se existir
DECLARE @df_created sysname, @sql nvarchar(max);
SELECT @df_created = dc.name
FROM sys.default_constraints dc
JOIN sys.tables t  ON t.object_id = dc.parent_object_id
JOIN sys.schemas s ON s.schema_id = t.schema_id
JOIN sys.columns c ON c.object_id = t.object_id AND c.column_id = dc.parent_column_id
WHERE s.name = 'app' AND t.name = 'automation_job' AND c.name = 'created_at';

IF @df_created IS NOT NULL
BEGIN
    SET @sql = N'ALTER TABLE app.automation_job DROP CONSTRAINT ' + QUOTENAME(@df_created) + N';';
    EXEC(@sql);
END

-- Drop default constraint de updated_at se existir
DECLARE @df_updated sysname;
SELECT @df_updated = dc.name
FROM sys.default_constraints dc
JOIN sys.tables t  ON t.object_id = dc.parent_object_id
JOIN sys.schemas s ON s.schema_id = t.schema_id
JOIN sys.columns c ON c.object_id = t.object_id AND c.column_id = dc.parent_column_id
WHERE s.name = 'app' AND t.name = 'automation_job' AND c.name = 'updated_at';

IF @df_updated IS NOT NULL
BEGIN
    SET @sql = N'ALTER TABLE app.automation_job DROP CONSTRAINT ' + QUOTENAME(@df_updated) + N';';
    EXEC(@sql);
END
GO

-- Altera os tipos
IF COL_LENGTH('app.automation_job', 'created_at') IS NOT NULL
    ALTER TABLE app.automation_job ALTER COLUMN created_at datetimeoffset(6) NOT NULL;
IF COL_LENGTH('app.automation_job', 'updated_at') IS NOT NULL
    ALTER TABLE app.automation_job ALTER COLUMN updated_at datetimeoffset(6) NOT NULL;
GO

-- Recria defaults
IF COL_LENGTH('app.automation_job', 'created_at') IS NOT NULL
    ALTER TABLE app.automation_job ADD CONSTRAINT DF_automation_job_created_at DEFAULT (SYSDATETIMEOFFSET()) FOR created_at;
IF COL_LENGTH('app.automation_job', 'updated_at') IS NOT NULL
    ALTER TABLE app.automation_job ADD CONSTRAINT DF_automation_job_updated_at DEFAULT (SYSDATETIMEOFFSET()) FOR updated_at;
GO
