# Servidor web mínimo para ver el recorrido en este computador (sin instalar nada).
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Recorrido disponible en http://localhost:$port/  (cierra esta ventana para detenerlo)"
Start-Process "http://localhost:$port/"
$types = @{ ".html"="text/html; charset=utf-8"; ".js"="text/javascript"; ".css"="text/css"; ".jpg"="image/jpeg"; ".png"="image/png"; ".json"="application/json" }
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
  if ($path -eq "") { $path = "index.html" }
  $file = Join-Path $root $path
  try {
    if ((Test-Path $file -PathType Leaf) -and ([IO.Path]::GetFullPath($file).StartsWith($root))) {
      $ext = [IO.Path]::GetExtension($file).ToLower()
      $ctx.Response.Headers.Add("Cache-Control", "no-store")
      $ctx.Response.ContentType = $(if ($types[$ext]) { $types[$ext] } else { "application/octet-stream" })
      if ($ctx.Request.HttpMethod -ne "HEAD") { $bytes = [IO.File]::ReadAllBytes($file); $ctx.Response.ContentLength64 = $bytes.Length; $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length) }
    } else { $ctx.Response.StatusCode = 404 }
  } catch {}
  $ctx.Response.Close()
}
