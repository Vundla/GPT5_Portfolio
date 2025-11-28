<?php
// src/Certifications.php - Certifications Column API Handler

require_once __DIR__ . "/db.php";
require_once __DIR__ . "/Response.php";

class Certifications {
    public static function list(): void {
        $db = DB::connect();
        $stmt = $db->query("SELECT * FROM certifications ORDER BY date_achieved DESC");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        Response::success($data, "Certifications retrieved successfully");
    }

    public static function get(int $id): void {
        $db = DB::connect();
        $stmt = $db->prepare("SELECT * FROM certifications WHERE id = :id");
        $stmt->execute(["id" => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$data) {
            Response::error("Certification not found", 404);
        }
        
        Response::success($data, "Certification retrieved successfully");
    }

    public static function create(): void {
        $input = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($input["title"]) || !isset($input["provider"])) {
            Response::error("Title and provider are required", 400);
        }

        $db = DB::connect();
        $stmt = $db->prepare("
            INSERT INTO certifications (title, provider, date_achieved, verification_link, skill_tags)
            VALUES (:title, :provider, :date_achieved, :verification_link, :skill_tags)
            RETURNING id
        ");
        
        $stmt->execute([
            "title" => $input["title"],
            "provider" => $input["provider"],
            "date_achieved" => $input["date_achieved"] ?? date("Y-m-d"),
            "verification_link" => $input["verification_link"] ?? null,
            "skill_tags" => $input["skill_tags"] ?? null
        ]);
        
        $id = $stmt->fetchColumn();
        Response::success(["id" => $id], "Certification created successfully");
    }
}
