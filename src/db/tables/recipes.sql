CREATE TABLE [dbo].[recipes]
(
    [ID] [int] IDENTITY(1,1) NOT NULL,
    [IMAGE] [varchar](300) NOT NULL,
    [TITLE] [varchar](30) NOT NULL,
    [READY_IN_MINUTES] [int] NOT NULL,
    [VEGAN] [BIT] NOT NULL,
    [GLUTEN_FREE] [BIT] NOT NULL,
    [SERVINGS] [int] NOT NULL,
    [INGREDIENTS] [nvarchar] NOT NULL,
    [INSTRUCTIONS] [nvarchar] NOT NULL,
    [FAMILY] [nvarchar],
    PRIMARY KEY (ID)
)