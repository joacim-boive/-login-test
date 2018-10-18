# Rewrite på IIS

För att inte skapa för många Web Sites med olika IP bindingar på våra IISer så har vi istället valt att lägga
det som olika applikationer i IIS. Vi vill dock att URLen är så bra som möjligt. Vi vill att det ska vara secure.ecster.se/login för login för sverige.

För att det ska vara förvaltningsbart och utvecklingsbart med nya länder så kan inte se ta "login". Därav deployar vi login för Sverige som login_se.
För att urlen ska bli login_se som vi deployar som på vår sida har vi gjort en IIS Rewrite. Den rewriten görs i login-applikationen som inte har med något
land att göra.

Gjort ett engångs WIIN script som gör installationen av login-applikationen.
