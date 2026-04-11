Add-Type -AssemblyName System.Drawing

$imagePath = "C:\Users\gabriel\.gemini\antigravity\brain\204c6aad-5ceb-4b17-b10b-21d8b1357259\church_logo_new_1775877604852.png"
$img = [System.Drawing.Image]::FromFile($imagePath)

$icon512 = New-Object System.Drawing.Bitmap(512, 512)
$g512 = [System.Drawing.Graphics]::FromImage($icon512)
$g512.Clear([System.Drawing.Color]::FromArgb(15, 23, 42))

$targetRect = New-Object System.Drawing.Rectangle(20, 0, 472, 430)
$g512.DrawImage($img, $targetRect)

$font1 = New-Object System.Drawing.Font("Arial", 36, [System.Drawing.FontStyle]::Bold)
$font2 = New-Object System.Drawing.Font("Arial", 26, [System.Drawing.FontStyle]::Regular)
$brushGold = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(234, 179, 8))
$brushSilver = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(226, 232, 240))
$stringFormat = New-Object System.Drawing.StringFormat
$stringFormat.Alignment = [System.Drawing.StringAlignment]::Center

$g512.DrawString("MINISTERIAL", $font1, $brushGold, 256, 425, $stringFormat)
$g512.DrawString("App para pastores e membros", $font2, $brushSilver, 256, 470, $stringFormat)

$icon512.Save("C:\Users\gabriel\Downloads\APP IGREJA\icon-512.png", [System.Drawing.Imaging.ImageFormat]::Png)

$icon192 = New-Object System.Drawing.Bitmap(192, 192)
$g192 = [System.Drawing.Graphics]::FromImage($icon192)
$g192.DrawImage($icon512, 0, 0, 192, 192)
$icon192.Save("C:\Users\gabriel\Downloads\APP IGREJA\icon-192.png", [System.Drawing.Imaging.ImageFormat]::Png)

$g512.Dispose()
$g192.Dispose()
$img.Dispose()
$icon512.Dispose()
$icon192.Dispose()

Write-Output "Image processing complete."
