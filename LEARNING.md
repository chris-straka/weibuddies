# Learning

## Scrypt vs Bcryptjs vs Argon2

I decided on scrypt (from the builtin node crypto module) because relying on third party modules is a security risk on its own. I read that argon2 is newer and is more preferred because it's memory intensive. After reading the official docs for scrypt it sounds like it's also memory intensive so that sounds good to me