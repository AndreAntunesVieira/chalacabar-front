Novo certificado:

```bash
sudo certbot -d *.chalacabar.com.br -d chalacabar.com.br --manual --preferred-challenges dns certonly
```

siga as instruções (sem pressa, espere uns 2 ou 5 minutos para cada DNS ser atualizado)

Para renovar basta:

```bash
sudo certbot renew
```
