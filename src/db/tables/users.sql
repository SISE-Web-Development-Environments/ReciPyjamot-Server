CREATE TABLE [dbo].[users]
(
    [ID] [int] IDENTITY(1,1) NOT NULL,
    [USERNAME] [varchar](30) NOT NULL UNIQUE,
    [FIRSTNAME] [varchar](30) NOT NULL,
    [LASTNAME] [varchar](30) NOT NULL,
    [COUNTRY] [varchar](30) NOT NULL,
    [PASSWORD] [varchar](300) NOT NULL,
    [EMAIL] [varchar](50) NOT NULL,
    [IMAGE] [varchar](300) NOT NULL,
    [LAST_SEARCH] [TEXT],
    PRIMARY KEY ([ID])
)