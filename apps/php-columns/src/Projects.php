<?php
// src/Projects.php - Projects Column API Handler

require_once __DIR__ . "/db.php";
require_once __DIR__ . "/Response.php";

class Projects {
    public static function list(): void {
        $db = DB::connect();
        $stmt = $db->query("SELECT * FROM projects ORDER BY id DESC");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        Response::success($data, "Projects retrieved successfully");
    }

    public static function get(int $id): void {
        $db = DB::connect();
        $stmt = $db->prepare("SELECT * FROM projects WHERE id = :id");
        $stmt->execute(["id" => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$data) {
            Response::error("Project not found", 404);
        }
        
        Response::success($data, "Project retrieved successfully");
    }

    public static function create(): void {
        $input = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($input["title"]) || !isset($input["description"])) {
            Response::error("Title and description are required", 400);
        }

        $db = DB::connect();
        $stmt = $db->prepare("
            INSERT INTO projects (title, description, github_link, demo_link, stack, screenshot_url)
            VALUES (:title, :description, :github_link, :demo_link, :stack, :screenshot_url)
            RETURNING id
        ");
        
        $stmt->execute([
            "title" => $input["title"],
            "description" => $input["description"],
            "github_link" => $input["github_link"] ?? null,
            "demo_link" => $input["demo_link"] ?? null,
            "stack" => $input["stack"] ?? null,
            "screenshot_url" => $input["screenshot_url"] ?? null
        ]);
        
        $id = $stmt->fetchColumn();
        Response::success(["id" => $id], "Project created successfully");
    }
}
