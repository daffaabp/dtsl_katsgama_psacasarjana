# API Documentation

## Base URL
```http
https://pasca-katsgama.dev.ugm.ac.id/api
```

## Authentication Endpoints

### Sign In
```http
POST https://pasca-katsgama.dev.ugm.ac.id/api/signin
```

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "token": "string",
        "id": "integer",
        "role": "integer",
        "role_name": "string",
        "angkatan": "string",
        "username": "string",
        "nama": "string"
    }
}
```

### Change Password
```http
POST https://pasca-katsgama.dev.ugm.ac.id/api/changePassword
```

**Request Body:**
```json
{
    "userId": "integer",
    "password": "string",
    "newPassword": "string"
}
```

**Response:**
```json
{
    "success": true
}
```

### Forgot Password
```http
POST https://pasca-katsgama.dev.ugm.ac.id/api/forgotPassword
```

**Request Body:**
```json
{
    "email": "string"
}
```

**Response:**
```json
{
    "success": true
}
```

## Alumni Endpoints

### Get All Alumni
```http
GET https://pasca-katsgama.dev.ugm.ac.id/api/getAlumni
```

**Query Parameters:**
```
q: string (search query)
tmasuk: string (tahun masuk)
occupation: integer (id bidang kerja)
province: integer (id provinsi)
jabatan: string
instansi: string
prodi: string
```

**Response:**
```json
{
    "alumni": [
        {
            "id": "integer",
            "nama": "string",
            "email": "string",
            "nowa": "string",
            "notelp": "string",
            "alamat": "string",
            "prop_id": "integer",
            "jabatan": "string",
            "instansi": "string",
            "occupation_id": "integer",
            "photo": "string",
            "jenjang": "string",
            "universitas": "string",
            "departemen": "string",
            "tmasuk": "string",
            "tlulus": "string",
            "propinsi": "string",
            "occupation": "string"
        }
    ],
    "pager": {
        "current_page": "integer",
        "per_page": "integer",
        "total": "integer"
    },
    "req": {}
}
```

### Get Alumni by ID
```http
GET https://pasca-katsgama.dev.ugm.ac.id/api/getAlumniById/{id}
```

**Response:**
```json
{
    "alumni": {
        "id": "integer",
        "nama": "string",
        "email": "string",
        "nowa": "string",
        "notelp": "string",
        "alamat": "string",
        "jabatan": "string",
        "instansi": "string",
        "photo": "string",
        "propinsi": "string",
        "occupation": "string"
    },
    "S1": {
        "idOrg": "integer",
        "jenjang": "string",
        "universitas": "string",
        "tmasuk": "string",
        "tlulus": "string",
        "prodi": "string"
    },
    "S2": {
        // sama seperti S1
    },
    "S3": {
        // sama seperti S1
    }
}
```

### Get Alumni by User ID
```http
GET https://pasca-katsgama.dev.ugm.ac.id/api/getAlumniByUserId/{userId}
```

**Response:**
```json
{
    "alumni": {
        // sama seperti getAlumniById
    },
    "S1": {
        // sama seperti getAlumniById
    },
    "S2": {
        // sama seperti getAlumniById
    },
    "S3": {
        // sama seperti getAlumniById
    }
}
```

### Edit Profile
```http
POST https://pasca-katsgama.dev.ugm.ac.id/api/editProfile/{userId}
```

**Request Body:**
```json
{
    "nama": "string",
    "email": "string",
    "nowa": "string",
    "notelp": "string",
    "alamat": "string",
    "prop_id": "integer",
    "instansi": "string",
    "jabatan": "string",
    "occupation_id": "integer",
    "s1_universitas": "string",
    "s1_tmasuk": "string",
    "s1_tlulus": "string",
    "s1_prodi": "string",
    "s2_universitas": "string",
    "s2_tmasuk": "string",
    "s2_tlulus": "string",
    "s2_prodi": "string",
    "s3_universitas": "string",
    "s3_tmasuk": "string",
    "s3_tlulus": "string",
    "s3_prodi": "string"
}
```

**Response:**
```json
{
    "success": true
}
```

### Edit Avatar
```http
POST https://pasca-katsgama.dev.ugm.ac.id/api/editAvatar/{userId}
```

**Request Body:**
```
Content-Type: multipart/form-data
file: File (image/jpg, image/jpeg, image/png, max: 5MB)
```

**Response:**
```json
{
    "success": true,
    "msg": "string"
}
```

### Get Filters
```http
GET https://pasca-katsgama.dev.ugm.ac.id/api/getFilters
```

**Response:**
```json
{
    "provinces": [
        {
            "label": "string",
            "value": "integer|null"
        }
    ],
    "prodis": [
        {
            "label": "string",
            "value": "string|null"
        }
    ],
    "angkatan": [
        {
            "label": "string",
            "value": "string|null"
        }
    ],
    "occupations": [
        {
            "label": "string",
            "value": "integer|null"
        }
    ]
}
```

## Error Responses

Semua endpoint dapat mengembalikan response error dengan format:

```json
{
    "success": false,
    "error": "string",
    "errCode": "string" // opsional
}
```

## Status Codes

* 200 - Success
* 400 - Bad Request
* 401 - Unauthorized
* 403 - Forbidden
* 404 - Not Found
* 500 - Internal Server Error

## Notes

1. Semua request yang membutuhkan autentikasi harus menyertakan token di header:
```http
Authorization: Bearer {token}
```

2. Format file foto yang didukung:
- JPG/JPEG
- PNG
- Maksimal ukuran: 5MB
- Akan diresize menjadi 150x150px

3. Pagination pada endpoint getAlumni menggunakan sistem page-based dengan 10 item per halaman
