-- Schema inicial
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'app')
BEGIN
    EXEC('CREATE SCHEMA app');
END
GO

-- Usuários
IF OBJECT_ID('app.user_account', 'U') IS NULL
BEGIN
    CREATE TABLE app.user_account (
        id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE,
        name NVARCHAR(120) NOT NULL,
        email NVARCHAR(180) NOT NULL UNIQUE,
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- Jobs de automação
IF OBJECT_ID('app.automation_job', 'U') IS NULL
BEGIN
    CREATE TABLE app.automation_job (
        id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        uuid VARCHAR(36) NOT NULL UNIQUE,
        type VARCHAR(40) NOT NULL,
        status VARCHAR(20) NOT NULL,
        payload NVARCHAR(MAX) NULL,
        error_message NVARCHAR(MAX) NULL,
        scheduled_at DATETIME2 NOT NULL,
        started_at DATETIME2 NULL,
        finished_at DATETIME2 NULL,
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
    CREATE INDEX ix_job_status_sched ON app.automation_job (status, scheduled_at);
END
GO
