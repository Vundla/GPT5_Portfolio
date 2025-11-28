<?php
// public/index.php - PHP Column Service Router

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"];

// Route: /projects
if ($uri === "/projects") {
    require_once __DIR__ . "/../src/Projects.php";
    
    if ($method === "GET") {
        Projects::list();
    } elseif ($method === "POST") {
        Projects::create();
    }
}

// Route: /projects/{id}
if (preg_match("/^\/projects\/(\d+)$/", $uri, $matches)) {
    require_once __DIR__ . "/../src/Projects.php";
    Projects::get((int)$matches[1]);
}

// Route: /certifications
if ($uri === "/certifications") {
    require_once __DIR__ . "/../src/Certifications.php";
    
    if ($method === "GET") {
        Certifications::list();
    } elseif ($method === "POST") {
        Certifications::create();
    }
}

// Route: /certifications/{id}
if (preg_match("/^\/certifications\/(\d+)$/", $uri, $matches)) {
    require_once __DIR__ . "/../src/Certifications.php";
    Certifications::get((int)$matches[1]);
}

// Route: /contact
if ($uri === "/contact") {
    require_once __DIR__ . "/../src/Contact.php";
    
    if ($method === "POST") {
        Contact::send();
    } elseif ($method === "GET") {
        Contact::list();
    }
}

// Route: /health
if ($uri === "/health") {
    echo json_encode([
        "status" => "healthy",
        "service" => "PHP Column Service",
        "version" => "1.0.0",
        "timestamp" => date("c")
    ]);
    exit;
}

// Fallback
echo json_encode([
    "service" => "PHP Column Service",
    "status" => "running",
    "endpoints" => [
        "GET /projects" => "List all projects",
        "POST /projects" => "Create a project",
        "GET /projects/{id}" => "Get a project by ID",
        "GET /certifications" => "List all certifications",
        "POST /certifications" => "Create a certification",
        "GET /certifications/{id}" => "Get a certification by ID",
        "POST /contact" => "Send a contact message",
        "GET /health" => "Health check"
    ]
]);
