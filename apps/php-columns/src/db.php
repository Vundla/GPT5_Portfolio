<?php
// src/db.php - Database connection handler for PHP Column Service

class DB {
    private static $instance = null;
    
    public static function connect(): PDO {
        if (self::$instance === null) {
            $host = getenv("DB_HOST") ?: "localhost";
            $db   = getenv("DB_NAME") ?: "GPT5_DB";
            $user = getenv("DB_USER") ?: "vundla";
            $pass = getenv("DB_PASS") ?: "";
            $port = getenv("DB_PORT") ?: "5432";

            try {
                self::$instance = new PDO(
                    "pgsql:host=$host;port=$port;dbname=$db",
                    $user,
                    $pass,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                    ]
                );
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["error" => "Database connection failed"]);
                exit;
            }
        }
        return self::$instance;
    }
}
