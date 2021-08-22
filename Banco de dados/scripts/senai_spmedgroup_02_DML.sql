USE SPMEDGROUP; -- Inicia a utilização do banco de dados
GO

INSERT INTO tipoUsuario(nomeTipoUsuario) -- Insere valores na tabela tipoUsuario 
VALUES ('Administrador'),
	   ('Paciente'),
	   ('Médico');
GO

INSERT INTO clinica(endClinica, nomeFantasia, razaoSocial, horaAbertura, horaFechamento, cnpj) -- Insere valores na tabela clinica 
VALUES ('Av. Barão Limeira, 532, São Paulo, SP', 'Clínica Possarle', 'SP Medical Group', '07:00:00', '21:00:00','86400902000130');
GO

INSERT INTO especialidade(nomeEspecialidade) -- Insere valores na tabela especialidade
VALUES ('Acupuntura'),
	   ('Anestesiologia'),
	   ('Angiologia'),
	   ('Cardiologia'),
	   ('Cirurgia Cardiovascular'),
	   ('Cirurgia da Mão'),
	   ('Cirurgia do aparelho digestivo'),
	   ('Cirurgia geral'),
	   ('Cirurgia pediátrica'),
	   ('Cirurgia plástica'),
	   ('Cirurgia torácica'),
	   ('Cirurgia vascular'),
	   ('Dermatologia'),
	   ('Radioterapia'),
	   ('Urologia'),
	   ('Pediatria'),
	   ('Psiquiatria');
GO

INSERT INTO situacao(situacaoDesc) -- Insere valores na tabela situacao
VALUES ('Agendada'),
	   ('Realizada'),
	   ('Cancelada');
GO

INSERT INTO usuario(idTipoUsuario, email, senha) -- Insere valores na tabela usuario
VALUES (1, 'saulo@email.com', 'soABC123'),
	   (1, 'lucas@email.com', 'lsDEF123'),
	   (3, 'ricardo.lemos@spmedicalgroup.com.br', 'roGHI123'),
	   (3, 'roberto.possarle@spmedicalgroup.com.br', 'roJKL123'),
	   (3, 'helena.souza@spmedicalgroup.com.br', 'haMNO123'),
	   (2, 'ligia@gmail.com', 'laPQR123'),
	   (2, 'alexandre@gmail.com', 'aeSTU123'),
	   (2, 'fernando@gmail.com', 'foVWX123'),
	   (2, 'henrique@gmail.com', 'heYZ123'),
	   (2, 'joao@hotmail.com', 'joABC456'),
	   (2, 'bruno@gmail.com', 'boDEF789'),
	   (2, 'mariana@outlook.com', 'maGHI321');
GO

INSERT INTO paciente(idUsuario, nomePaciente, rgPaciente, cpfPaciente, endPaciente, dataNascPaciente, telPaciente) -- Insere valores na tabela paciente
VALUES (6, 'Ligia', '435225435', '94839859000', 'Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000', '13/10/1983', '1134567654'),
	   (7, 'Alexandre', '326543457', '73556944057', 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200','23/07/2001', '11987656543'),
	   (8, 'Fernando', '546365253', '16839338002', 'Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200', '10/10/1978', '11972084453'),
	   (9, 'Henrique', '543663625', '14332654765', 'R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030', '13/10/1985', '1134566543'),
	   (10, 'João', '532544441', '91305348010', 'R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380', '27/08/1975', '1176566377'),
	   (11, 'Bruno', '545662667', '79799299004', 'Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001', '21/03/1972', '11954368769'),
	   (12, 'Mariana', '545662668', '13771913039', 'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140', '03/05/2018', NULL);
GO

INSERT INTO medico(idUsuario, idClinica, idEspecialidade, crm, nomeMedico) -- Insere valores na tabela medico
VALUES (3, 1, 2, '54356SP', 'Ricardo Lemos'),
	   (4, 1, 17, '53452SP', 'Roberto Possarle'),
	   (5, 1, 16, '65463SP', 'Helena Strada');
GO

INSERT INTO consulta (idPaciente, idMedico, idSituacao, dataConsulta) -- Insere valores na tabela consulta
VALUES (7, 3, 2, '20/01/20 15:00:00'),
	   (2, 2, 3, '01/06/2020  10:00:00'),
	   (3, 2, 2, '02/07/2020  11:00:00'),
	   (2, 2, 2, '02/06/2018  10:00:00'),
	   (4, 1, 3, '02/07/2019  11:00:00'),
	   (7, 3, 1, '03/08/2020  15:00:00'),
	   (4, 1, 1, '03/09/2020  11:00:00');
GO


