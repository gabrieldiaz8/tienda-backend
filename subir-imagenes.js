const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dx2xjzhq6',
  api_key: '926711118244217',
  api_secret: 'RcxYc6ddNnAD3rohOUJTAZH3HRA',
});

const uploadsDir = path.join(__dirname, 'uploads');
const files = fs.readdirSync(uploadsDir);

async function subirImagenes() {
  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const publicId = path.parse(file).name;

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'uploads',
        public_id: publicId,
        use_filename: true,
        overwrite: true,
      });
      console.log(`✅ Subida: ${file} → ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Error con ${file}:`, err.message);
    }
  }
  console.log('Listo!');
}

subirImagenes();