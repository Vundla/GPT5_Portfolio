<?php
// src/Response.php - Unified API Response Handler

class Response {
    public static function json($data, int $code = 200): void {
        http_response_code($code);
        header("Content-Type: application/json");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        echo json_encode($data, JSON_PRETTY_PRINT);
        exit;
    }

    public static function error(string $message, int $code = 400): void {
        self::json(["error" => $message], $code);
    }

    public static function success($data, string $message = "Success"): void {
        self::json([
            "status" => "success",
            "message" => $message,
            "data" => $data
        ]);
    }
}
