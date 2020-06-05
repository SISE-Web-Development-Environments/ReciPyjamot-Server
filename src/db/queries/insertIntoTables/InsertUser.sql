INSERT INTO [dbo].[users]
    (
    [USERNAME], [FIRSTNAME], [LASTNAME], [COUNTRY], [PASSWORD], [EMAIL] ,[IMAGE]
    )
VALUES
    (
        'SapirShamay', 'Sapir', 'Shamay', 'Israel', HASHBYTES('SHA2_256', '12345'), 'sapirnag@post.bgu.ac.il', 'https://www.impel.eu/wp-content/uploads/2019/08/mediterranean-sea.jpg'
    )

GO

INSERT INTO dbo.users
    (
    [USERNAME], [FIRSTNAME], [LASTNAME], [COUNTRY], [PASSWORD], [EMAIL] ,[IMAGE]
    )
VALUES
    (
        'HaimReyes', 'Haim', 'Reyes', 'Israel', HASHBYTES('SHA2_256', '67891'), 'reyes@post.bgu.ac.il', 'https://ewscripps.brightspotcdn.com/74/8a/b8272ed446d5b12323d2c14c5401/denver-7-picasso-6.jpg'
    )

GO