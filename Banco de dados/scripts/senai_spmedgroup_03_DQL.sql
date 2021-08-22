USE SPMEDGROUP;
GO

SELECT * FROM clinica; -- Seleciona todos os registros da tabela clinica
GO

SELECT * FROM consulta; -- Seleciona todos os registros da tabela consulta

SELECT * FROM especialidade; -- Seleciona todos os registros da tabela especialidade
GO

SELECT * FROM medico; -- Seleciona todos os registros da tabela medico
GO

SELECT * FROM paciente; -- Seleciona todos os registros da tabela paciente
GO

SELECT * FROM situacao; -- Seleciona todos os registros da tabela situacao
GO

SELECT * FROM tipoUsuario; -- Seleciona todos os registros da tabela tipoUsuario
GO

SELECT * FROM usuario; -- Seleciona todos os registros da tabela usuario
GO


-- Seleciona os registros da tabela consulta juntamente aos seus correspondentes mais relevantes em outras tabelas
SELECT nomePaciente Paciente, cpfPaciente CPF, nomeMedico [Médico], nomeEspecialidade Especialidade, nomeFantasia [Clínica], endClinica [Endereço], dataConsulta [Data], situacaoDesc [Descrição] FROM consulta
LEFT JOIN paciente
ON consulta.idPaciente = paciente.idPaciente
LEFT JOIN medico 
ON medico.idMedico = consulta.idMedico
LEFT JOIN clinica
ON medico.idClinica = clinica.idClinica
LEFT JOIN especialidade
ON especialidade.idEspecialidade = medico.idEspecialidade
LEFT JOIN situacao
ON situacao.idSituacao = consulta.idSituacao
GO


-- Seleciona os registros da tabela consulta juntamente aos seus correspondentes mais relevantes em outras tabelas, 
-- filtrados para um médico em específico
SELECT nomePaciente Paciente, cpfPaciente CPF, nomeMedico [Médico], nomeEspecialidade Especialidade, nomeFantasia [Clínica], endClinica [Endereço], dataConsulta [Data], situacaoDesc [Descrição] FROM consulta
LEFT JOIN paciente
ON consulta.idPaciente = paciente.idPaciente
LEFT JOIN medico 
ON medico.idMedico = consulta.idMedico
LEFT JOIN clinica
ON medico.idClinica = clinica.idClinica
LEFT JOIN especialidade
ON especialidade.idEspecialidade = medico.idEspecialidade
LEFT JOIN situacao
ON situacao.idSituacao = consulta.idSituacao
WHERE consulta.idMedico = 2
GO


-- Seleciona os registros da tabela usuario juntamente aos seus correspondentes mais relevantes na tabela paciente,
-- filtrando-os com base no login de um usuário em específico.
SELECT nomePaciente Paciente, cpfPaciente CPF, endPaciente [Endereço], telPaciente Telefone, email FROM usuario
RIGHT JOIN paciente 
ON usuario.idUsuario = paciente.idUsuario
WHERE usuario.email = 'mariana@outlook.com' AND usuario.senha = 'maGHI321'
GO

-- Utiliza a função COUNT() para retornar a quantidade de usuários cadastrados
SELECT COUNT(*) FROM usuario
GO


-- Seleciona as datas de nascimento dos pacientes convertidas para o formato (mm/dd/yyyy)
SELECT CONVERT(VARCHAR(10), dataNascPaciente, 101) FROM paciente
GO


-- Cria uma função que retorna a quantidade de médicos que possuem determinada especialidade
CREATE FUNCTION EspecialidadeMedicos (@especialidade TINYINT) 
RETURNS TINYINT
BEGIN 
	DECLARE @quantidade TINYINT
	SELECT @quantidade = COUNT(*) FROM medico WHERE idEspecialidade = @especialidade
	RETURN @quantidade
END

SELECT dbo.EspecialidadeMedicos(17) -- Executa a função EspecialidadeMedicos


-- Cria um procedimento que retorna a idade de um determinado usuário
CREATE PROCEDURE idade 
@idUsuario INT
AS
	DECLARE @data VARCHAR(10)
	SELECT @data = dataNascPaciente FROM paciente WHERE idPaciente = @idUsuario
	SELECT FLOOR (DATEDIFF(DAY, @data, GETDATE()) / 365)


EXEC idade @idUsuario = 2 -- Executa o procedimento idade