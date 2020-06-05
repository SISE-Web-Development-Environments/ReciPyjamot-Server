CREATE TABLE [dbo].[usersRecipes]
(
    [USER_ID] [int] NOT NULL,
    [RECIPE_ID] [int] NOT NULL,
    [RELATION] [varchar](10) NOT NULL,
    PRIMARY KEY ([USER_ID], [RECIPE_ID]),
)