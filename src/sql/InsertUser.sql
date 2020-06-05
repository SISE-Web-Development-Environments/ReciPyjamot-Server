INSERT INTO dbo.users
    (
    [username], [password]
    )
VALUES
    (
        'SapirShamay', HASHBYTES('SHA2_256', 'sapir')
)

GO

INSERT INTO dbo.users
    (
    [username], [password]
    )
VALUES
    (
        'HaimReyes', HASHBYTES('SHA2_256', 'haim')
)

GO