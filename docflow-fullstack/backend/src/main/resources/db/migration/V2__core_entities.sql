-- Core entidades para Requests/GRD/Organizações/Projetos/Documentos
-- Organizations
IF OBJECT_ID('app.organization', 'U') IS NULL
BEGIN
    CREATE TABLE app.organization (
        id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        name NVARCHAR(180) NOT NULL,
        org_type VARCHAR(20) NOT NULL,
        cnpj VARCHAR(18) NULL,
        email NVARCHAR(120) NULL,
        phone NVARCHAR(40) NULL,
        address NVARCHAR(255) NULL
    );
END
GO

-- Projects
IF OBJECT_ID('app.project', 'U') IS NULL
BEGIN
    CREATE TABLE app.project (
        id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        code VARCHAR(40) NOT NULL UNIQUE,
        name NVARCHAR(180) NOT NULL,
        client_id BIGINT NULL REFERENCES app.organization(id)
    );
END
GO

-- Documents
IF OBJECT_ID('app.document', 'U') IS NULL
BEGIN
    CREATE TABLE app.document (
        id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        code VARCHAR(40) NOT NULL,
        name NVARCHAR(180) NOT NULL,
        project_id BIGINT NULL REFERENCES app.project(id),
        revision VARCHAR(40) NULL,
        format VARCHAR(10) NULL,
        pages INT NULL,
        file_url NVARCHAR(255) NULL
    );
END
GO

-- Requests
IF OBJECT_ID('app.request', 'U') IS NULL
BEGIN
    CREATE TABLE app.request (
        id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        request_number VARCHAR(40) NULL UNIQUE,
        project_id BIGINT NULL REFERENCES app.project(id),
        origin_id BIGINT NULL REFERENCES app.organization(id),
        destination_id BIGINT NULL REFERENCES app.organization(id),
        purpose NVARCHAR(120) NULL,
        description NVARCHAR(MAX) NULL,
        requester_name NVARCHAR(120) NULL,
        requester_contact NVARCHAR(120) NULL,
        target_name NVARCHAR(120) NULL,
        target_contact NVARCHAR(120) NULL,
        request_date DATETIME2 NULL,
        deadline DATETIME2 NULL,
        justification NVARCHAR(MAX) NULL,
        special_instructions NVARCHAR(MAX) NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
        created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        updated_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- Request x Document
IF OBJECT_ID('app.request_document', 'U') IS NULL
BEGIN
    CREATE TABLE app.request_document (
        id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        request_id BIGINT NOT NULL REFERENCES app.request(id),
        document_id BIGINT NOT NULL REFERENCES app.document(id),
        is_required BIT NOT NULL DEFAULT 0,
        CONSTRAINT uq_request_doc UNIQUE (request_id, document_id)
    );
END
GO

-- GRD (header)
IF OBJECT_ID('app.grd', 'U') IS NULL
BEGIN
    CREATE TABLE app.grd (
        id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        number VARCHAR(50) NOT NULL UNIQUE,
        protocol VARCHAR(40) NULL UNIQUE,
        project_id BIGINT NULL REFERENCES app.project(id),
        origin_id BIGINT NULL REFERENCES app.organization(id),
        destination_id BIGINT NULL REFERENCES app.organization(id),
        purpose NVARCHAR(120) NULL,
        delivery_method NVARCHAR(60) NULL,
        observations NVARCHAR(MAX) NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'EMITTED',
        emitted_by NVARCHAR(120) NULL,
        emission_at DATETIME2 NULL,
        request_id BIGINT NULL REFERENCES app.request(id)
    );
END
GO

-- GRD items
IF OBJECT_ID('app.grd_item', 'U') IS NULL
BEGIN
    CREATE TABLE app.grd_item (
        id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        grd_id BIGINT NOT NULL REFERENCES app.grd(id),
        document_id BIGINT NOT NULL REFERENCES app.document(id),
        revision VARCHAR(40) NULL,
        format VARCHAR(10) NULL,
        pages INT NULL
    );
END
GO
