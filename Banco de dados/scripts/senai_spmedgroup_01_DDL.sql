CREATE DATABASE SPMEDGROUP; -- Cria o banco de dados SPMEDGROUP
GO

USE SPMEDGROUP; -- Inicia a utilização do banco de dados
GO


CREATE TABLE tipoUsuario ( -- Cria a entidade tipoUsuario
	idTipoUsuario TINYINT PRIMARY KEY IDENTITY,
	nomeTipoUsuario VARCHAR(70) UNIQUE
);
GO

CREATE TABLE clinica ( -- Cria a entidade clinica
	idClinica SMALLINT PRIMARY KEY IDENTITY,
	endClinica VARCHAR(200) NOT NULL,
	cnpj CHAR(14) UNIQUE NOT NULL, 
	nomeFantasia VARCHAR(100) NOT NULL,
	razaoSocial VARCHAR(100) UNIQUE NOT NULL,
	horaAbertura TIME,
	horaFechamento TIME
);
GO

CREATE TABLE especialidade ( -- Cria a entidade especialidade
	idEspecialidade TINYINT PRIMARY KEY IDENTITY,
	nomeEspecialidade VARCHAR(100) UNIQUE
);
GO

CREATE TABLE situacao ( -- Cria a entidade situacao
	idSituacao TINYINT PRIMARY KEY IDENTITY,
	situacaoDesc VARCHAR(100)
);
GO

CREATE TABLE usuario ( -- Cria a entidade usuario
	idUsuario INT PRIMARY KEY IDENTITY,
	idTipoUsuario TINYINT FOREIGN KEY REFERENCES tipoUsuario(idTipoUsuario) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	senha VARCHAR(20) NOT NULL
);
GO

CREATE TABLE paciente ( -- Cria a entidade paciente
	idPaciente INT PRIMARY KEY IDENTITY,
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario) UNIQUE NOT NULL,
	nomePaciente VARCHAR(100) NOT NULL,
	rgPaciente CHAR(9) UNIQUE NOT NULL,
	cpfPaciente CHAR(11) UNIQUE NOT NULL, 
	endPaciente VARCHAR(200) NOT NULL,
	dataNascPaciente DATE NOT NULL,
	telPaciente VARCHAR(11)
);
GO

CREATE TABLE medico ( -- Cria a entidade medico
	idMedico SMALLINT PRIMARY KEY IDENTITY,
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario) UNIQUE NOT NULL,
	idClinica SMALLINT FOREIGN KEY REFERENCES clinica(idClinica) NOT NULL,
	idEspecialidade TINYINT FOREIGN KEY REFERENCES especialidade(idEspecialidade) NOT NULL,
	crm CHAR(7) UNIQUE NOT NULL,
	nomeMedico VARCHAR(100) NOT NULL
);
GO

CREATE TABLE consulta ( -- Cria a entidade consulta
	idConsulta INT PRIMARY KEY IDENTITY,
	idPaciente INT FOREIGN KEY REFERENCES paciente(idPaciente) NOT NULL,
	idMedico SMALLINT FOREIGN KEY REFERENCES medico(idMedico) NOT NULL,
	idSituacao TINYINT FOREIGN KEY REFERENCES situacao(idSituacao) NOT NULL,
	consultaDesc VARCHAR(500),
	dataConsulta DATETIME NOT NULL,
);
GO




