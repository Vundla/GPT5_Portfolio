<?php
// src/Contact.php - Contact Form Handler

require_once __DIR__ . "/db.php";
require_once __DIR__ . "/Response.php";

class Contact {
    public static function send(): void {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input["email"]) || !isset($input["message"])) {
            Response::error("Email and message are required", 400);
        }

        // Validate email format
        if (!filter_var($input["email"], FILTER_VALIDATE_EMAIL)) {
            Response::error("Invalid email format", 400);
        }

        // Store message in database
        $db = DB::connect();
        $stmt = $db->prepare("
            INSERT INTO contact_messages (name, email, message, created_at)
            VALUES (:name, :email, :message, CURRENT_TIMESTAMP)
            RETURNING id
        ");
        
        $stmt->execute([
            "name" => $input["name"] ?? "Anonymous",
            "email" => $input["email"],
            "message" => $input["message"]
        ]);
        
        $id = $stmt->fetchColumn();

        // In production: Send email via SMTP here
        // mail($to, $subject, $message, $headers);

        Response::success([
            "id" => $id,
            "status" => "Message received"
        ], "Your message has been sent successfully");
    }

    public static function list(): void {
        $db = DB::connect();
        $stmt = $db->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        Response::success($data, "Messages retrieved successfully");
    }
}
