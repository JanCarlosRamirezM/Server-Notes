// -------------------------------
// PUERTO DEL SERVER
// -------------------------------
let PuertoDesarrollo = 3000;
process.env.PORT = process.env.PORT || PuertoDesarrollo;

// -------------------------------
// ENTORNO
// -------------------------------
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// -------------------------------
// URL DE LA DB
// -------------------------------
let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/notesdb";
} else {
    urlDB = process.env.URI_MONGODB
}

process.env.URL_DB = urlDB;
