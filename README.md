<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JavaScript Full Stack Course</title>

    <!-- Bootstrap 5 + Icons + Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,600;14..32,700&display=swap" rel="stylesheet" />

    <style>
        /* ----- Custom Styles ----- */
        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            --card-hover-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        * {
            font-family: 'Inter', sans-serif;
        }

        body {
            background: #f8f9fc;
            padding-top: 70px; /* for fixed navbar */
        }

        /* ----- Navbar ----- */
        .navbar {
            background: rgba(255, 255, 255, 0.85) !important;
            backdrop-filter: blur(12px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
        }
        .navbar-brand {
            font-weight: 700;
            color: #4a3f5c !important;
        }
        .navbar-brand i {
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-right: 8px;
        }

        /* ----- Hero Section ----- */
        .hero {
            background: var(--primary-gradient);
            color: #fff;
            padding: 80px 0 60px;
            border-radius: 0 0 40px 40px;
            margin: -70px 0 40px 0;
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
        }
        .hero h1 {
            font-weight: 800;
            font-size: 3.2rem;
            letter-spacing: -0.5px;
        }
        .hero .btn-light {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.5);
            color: #fff;
            font-weight: 600;
            padding: 12px 30px;
            border-radius: 50px;
            transition: 0.3s;
        }
        .hero .btn-light:hover {
            background: #fff;
            color: #667eea;
            border-color: #fff;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        /* ----- Section Titles ----- */
        .section-title {
            font-weight: 700;
            font-size: 2.2rem;
            letter-spacing: -0.5px;
            position: relative;
            display: inline-block;
            margin-bottom: 2rem;
        }
        .section-title:after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--primary-gradient);
            border-radius: 4px;
        }
        .section-title i {
            margin-right: 12px;
            color: #764ba2;
        }

        /* ----- Module Cards ----- */
        .module-card {
            background: #fff;
            border: none;
            border-radius: 20px;
            box-shadow: var(--card-shadow);
            transition: all 0.3s ease;
            height: 100%;
            padding: 1.8rem 1.5rem;
        }
        .module-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--card-hover-shadow);
        }
        .module-card .card-number {
            width: 40px;
            height: 40px;
            background: var(--primary-gradient);
            color: #fff;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
        .module-card h5 {
            font-weight: 700;
            color: #2d2b3a;
        }
        .module-card ul {
            list-style: none;
            padding-left: 0;
            font-size: 0.95rem;
        }
        .module-card ul li {
            padding: 4px 0;
            display: flex;
            align-items: start;
        }
        .module-card ul li i {
            color: #667eea;
            margin-right: 10px;
            font-size: 0.8rem;
            margin-top: 5px;
        }

        /* ----- Tech Table ----- */
        .tech-table {
            background: #fff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: var(--card-shadow);
        }
        .tech-table th {
            background: var(--primary-gradient);
            color: #fff;
            font-weight: 600;
            border: none;
            padding: 16px 20px;
        }
        .tech-table td {
            padding: 14px 20px;
            border-bottom: 1px solid #f0f0f5;
        }
        .tech-table tr:last-child td {
            border-bottom: none;
        }
        .tech-table td:first-child {
            font-weight: 600;
            color: #2d2b3a;
        }

        /* ----- Learning Outcomes ----- */
        .outcome-item {
            background: #fff;
            border-radius: 16px;
            padding: 16px 20px;
            box-shadow: var(--card-shadow);
            transition: 0.2s;
            border-left: 5px solid #667eea;
        }
        .outcome-item:hover {
            transform: scale(1.02);
        }
        .outcome-item i {
            color: #28a745;
            font-size: 1.3rem;
            margin-right: 12px;
        }

        /* ----- Footer ----- */
        footer {
            background: #1e1e2f;
            color: #c8c8d6;
            padding: 40px 0 20px;
            border-radius: 40px 40px 0 0;
            margin-top: 60px;
        }
        footer a {
            color: #c8c8d6;
            transition: 0.3s;
        }
        footer a:hover {
            color: #fff;
        }

        /* ----- Responsive tweaks ----- */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.2rem;
            }
            .hero {
                padding: 60px 0 40px;
            }
        }
    </style>
</head>
<body>

    <!-- ===== NAVBAR ===== -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="fas fa-code"></i> FullStack JS
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navMenu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#modules">Modules</a></li>
                    <li class="nav-item"><a class="nav-link" href="#tech">Tech Stack</a></li>
                    <li class="nav-item"><a class="nav-link" href="#outcomes">Outcomes</a></li>
                    <li class="nav-item"><a class="nav-link" href="#start">Get Started</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- ===== HERO ===== -->
    <section class="hero text-center">
        <div class="container">
            <h1>JavaScript Full Stack</h1>
            <p class="lead mt-3 mb-4" style="font-weight: 400; opacity: 0.9;">
                Master the modern JavaScript ecosystem — from React to Node, Docker to Serverless.
            </p>
            <a href="javascript-full-stack-course-outline.pdf" class="btn btn-light" target="_blank">
                <i class="fas fa-file-pdf me-2"></i> Download Course Outline (PDF)
            </a>
            <div class="mt-5">
                <span class="badge bg-white text-dark me-2 p-2 px-3">React</span>
                <span class="badge bg-white text-dark me-2 p-2 px-3">Node.js</span>
                <span class="badge bg-white text-dark me-2 p-2 px-3">Express</span>
                <span class="badge bg-white text-dark me-2 p-2 px-3">MongoDB</span>
                <span class="badge bg-white text-dark me-2 p-2 px-3">Docker</span>
                <span class="badge bg-white text-dark p-2 px-3">Kubernetes</span>
            </div>
        </div>
    </section>

    <!-- ===== MAIN CONTENT ===== -->
    <div class="container">

        <!-- Course Overview -->
        <section class="mb-5">
            <h2 class="section-title"><i class="fas fa-book-open"></i> Course Overview</h2>
            <p class="lead" style="font-weight: 400; color: #4a4a5a;">
                A comprehensive full‑stack JavaScript development course covering front‑end and back‑end technologies,
                cloud‑native development, DevOps practices, and modern software engineering methodologies.
            </p>
            <p><strong>Objectives:</strong> Master the complete JavaScript ecosystem to build scalable, production‑ready
            web applications from scratch. This course provides hands‑on experience with industry‑standard tools and frameworks.</p>
        </section>

        <!-- Modules -->
        <section id="modules" class="mb-5">
            <h2 class="section-title"><i class="fas fa-cubes"></i> Course Modules</h2>
            <div class="row g-4">
                <!-- Module 1 -->
                <div class="col-md-6 col-lg-4">
                    <div class="module-card">
                        <div class="card-number">1</div>
                        <h5>Front-End Development with React</h5>
                        <ul>
                            <li><i class="fas fa-chevron-right"></i> Build UIs with React, JSX, ES6</li>
                            <li><i class="fas fa-chevron-right"></i> Reusable components</li>
                            <li><i class="fas fa-chevron-right"></i> Props, state, hooks, forms, Redux</li>
                            <li><i class="fas fa-chevron-right"></i> Build a shopping cart app</li>
                        </ul>
                    </div>
                </div>
                <!-- Module 2 -->
                <div class="col-md-6 col-lg-4">
                    <div class="module-card">
                        <div class="card-number">2</div>
                        <h5>Back-End with Node.js & Express</h5>
                        <ul>
                            <li><i class="fas fa-chevron-right"></i> Server-side with Node.js runtime</li>
                            <li><i class="fas fa-chevron-right"></i> Express framework &amp; third‑party packages</li>
                            <li><i class="fas fa-chevron-right"></i> npm package management</li>
                            <li><i class="fas fa-chevron-right"></i> Async callbacks &amp; promises</li>
                        </ul>
                    </div>
                </div>
                <!-- Module 3 -->
                <div class="col-md-6 col-lg-4">
                    <div class="module-card">
                        <div class="card-number">3</div>
                        <h5>Cloud Native, DevOps, Agile &amp; NoSQL</h5>
                        <ul>
                            <li><i class="fas fa-chevron-right"></i> Cloud‑native concepts &amp; CNCF</li>
                            <li><i class="fas fa-chevron-right"></i> CI/CD, Agile, Scrum, ZenHub</li>
                            <li><i class="fas fa-chevron-right"></i> MongoDB CRUD operations</li>
                            <li><i class="fas fa-chevron-right"></i> TDD vs BDD</li>
                        </ul>
                    </div>
                </div>
                <!-- Module 4 -->
                <div class="col-md-6 col-lg-4">
                    <div class="module-card">
                        <div class="card-number">4</div>
                        <h5>Containers: Docker, K8s &amp; OpenShift</h5>
                        <ul>
                            <li><i class="fas fa-chevron-right"></i> Build cloud‑native apps with containers</li>
                            <li><i class="fas fa-chevron-right"></i> Docker, Kubernetes, OpenShift, Istio</li>
                            <li><i class="fas fa-chevron-right"></i> YAML deployment files</li>
                            <li><i class="fas fa-chevron-right"></i> Pods, services, replicasets</li>
                        </ul>
                    </div>
                </div>
                <!-- Module 5 -->
                <div class="col-md-6 col-lg-4">
                    <div class="module-card">
                        <div class="card-number">5</div>
                        <h5>Microservices &amp; Serverless</h5>
                        <ul>
                            <li><i class="fas fa-chevron-right"></i> Monolithic vs microservices</li>
                            <li><i class="fas fa-chevron-right"></i> REST APIs, cURL, Postman, SwaggerUI</li>
                            <li><i class="fas fa-chevron-right"></i> Deploy with Docker &amp; IBM Code Engine</li>
                            <li><i class="fas fa-chevron-right"></i> Hands‑on cloud labs</li>
                        </ul>
                    </div>
                </div>
                <!-- Module 6 -->
                <div class="col-md-6 col-lg-4">
                    <div class="module-card">
                        <div class="card-number">6</div>
                        <h5>Node.js &amp; MongoDB Database</h5>
                        <ul>
                            <li><i class="fas fa-chevron-right"></i> Back‑end with Node, Express, NoSQL</li>
                            <li><i class="fas fa-chevron-right"></i> Secure REST APIs (auth, authz)</li>
                            <li><i class="fas fa-chevron-right"></i> Error handling &amp; validation</li>
                            <li><i class="fas fa-chevron-right"></i> Scale &amp; deploy on cloud</li>
                        </ul>
                    </div>
                </div>
                <!-- Module 7 -->
                <div class="col-md-6 col-lg-4">
                    <div class="module-card">
                        <div class="card-number">7</div>
                        <h5>Full Stack Capstone Project</h5>
                        <ul>
                            <li><i class="fas fa-chevron-right"></i> Integrate React, Node, Express, MongoDB</li>
                            <li><i class="fas fa-chevron-right"></i> Build a real‑world web app</li>
                            <li><i class="fas fa-chevron-right"></i> Deploy with containers &amp; serverless</li>
                            <li><i class="fas fa-chevron-right"></i> CI/CD &amp; Agile practices</li>
                        </ul>
                    </div>
                </div>
                <!-- Module 8 -->
                <div class="col-md-6 col-lg-4">
                    <div class="module-card">
                        <div class="card-number">8</div>
                        <h5>Career Preparation</h5>
                        <ul>
                            <li><i class="fas fa-chevron-right"></i> Software engineer role &amp; career paths</li>
                            <li><i class="fas fa-chevron-right"></i> Resume, portfolio, job search</li>
                            <li><i class="fas fa-chevron-right"></i> Interview cycles &amp; types</li>
                            <li><i class="fas fa-chevron-right"></i> Effective interview techniques</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Technologies Table -->
        <section id="tech" class="mb-5">
            <h2 class="section-title"><i class="fas fa-tools"></i> Technologies &amp; Tools Covered</h2>
            <div class="tech-table table-responsive">
                <table class="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Technologies</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Front‑End</td><td>React, JSX, ES6, Redux</td></tr>
                        <tr><td>Back‑End</td><td>Node.js, Express.js</td></tr>
                        <tr><td>Database</td><td>MongoDB, CRUD operations</td></tr>
                        <tr><td>Containers</td><td>Docker, Kubernetes, OpenShift</td></tr>
                        <tr><td>DevOps</td><td>CI/CD, Agile, Scrum, Git</td></tr>
                        <tr><td>Cloud</td><td>Cloud‑native, Serverless, IBM Code Engine</td></tr>
                        <tr><td>API</td><td>REST, cURL, Postman, SwaggerUI</td></tr>
                        <tr><td>Testing</td><td>TDD, BDD</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Prerequisites + Outcomes -->
        <div class="row g-4 mb-5">
            <div class="col-md-6">
                <h2 class="section-title"><i class="fas fa-list-check"></i> Prerequisites</h2>
                <ul class="list-unstyled ps-3">
                    <li><i class="fas fa-check-circle text-success me-2"></i> Basic understanding of software development</li>
                    <li><i class="fas fa-check-circle text-success me-2"></i> Familiarity with programming fundamentals</li>
                    <li><i class="fas fa-check-circle text-success me-2"></i> Knowledge of JSON and AJAX (beneficial)</li>
                </ul>
            </div>
            <div class="col-md-6">
                <h2 class="section-title"><i class="fas fa-graduation-cap"></i> Key Learning Outcomes</h2>
                <div class="outcome-item mb-2">
                    <i class="fas fa-check-circle"></i> Build full‑stack web apps with JavaScript
                </div>
                <div class="outcome-item mb-2">
                    <i class="fas fa-check-circle"></i> Develop interactive UIs with React
                </div>
                <div class="outcome-item mb-2">
                    <i class="fas fa-check-circle"></i> Create secure REST APIs with Node &amp; Express
                </div>
                <div class="outcome-item mb-2">
                    <i class="fas fa-check-circle"></i> Work with NoSQL databases (MongoDB)
                </div>
                <div class="outcome-item mb-2">
                    <i class="fas fa-check-circle"></i> Deploy with Docker, Kubernetes, serverless
                </div>
                <div class="outcome-item mb-2">
                    <i class="fas fa-check-circle"></i> Implement CI/CD and Agile practices
                </div>
                <div class="outcome-item">
                    <i class="fas fa-check-circle"></i> Prepare for software engineering careers
                </div>
            </div>
        </div>

        <!-- Getting Started & Project Structure -->
        <section id="start" class="mb-5">
            <h2 class="section-title"><i class="fas fa-rocket"></i> Getting Started</h2>
            <ol class="list-group list-group-numbered mb-4">
                <li class="list-group-item bg-transparent border-0 ps-0">Set up your development environment</li>
                <li class="list-group-item bg-transparent border-0 ps-0">Install Node.js and npm</li>
                <li class="list-group-item bg-transparent border-0 ps-0">Set up Git for version control</li>
                <li class="list-group-item bg-transparent border-0 ps-0">Create a GitHub account</li>
                <li class="list-group-item bg-transparent border-0 ps-0">Explore Docker and containerization tools</li>
            </ol>

            <h2 class="section-title mt-5"><i class="fas fa-folder-tree"></i> Project Structure</h2>
            <div class="bg-dark text-light p-4 rounded-4" style="font-family: 'Courier New', monospace; font-size: 0.9rem;">
                <pre class="mb-0" style="color: #c8d6e5;">
javascript-fullstack-course/
├── frontend/
│   └── react-applications/
├── backend/
│   └── node-express-api/
├── database/
│   └── mongodb-models/
├── microservices/
├── capstone-project/
└── devops/
    ├── docker/
    ├── kubernetes/
    └── ci-cd-pipelines/
                </pre>
            </div>
        </section>

        <!-- Assessment & Contributing -->
        <div class="row g-4 mb-5">
            <div class="col-md-6">
                <h2 class="section-title"><i class="fas fa-clipboard-check"></i> Assessment &amp; Projects</h2>
                <ul class="list-unstyled ps-3">
                    <li><i class="fas fa-check text-primary me-2"></i> Hands‑on coding exercises</li>
                    <li><i class="fas fa-check text-primary me-2"></i> React‑based front‑end projects</li>
                    <li><i class="fas fa-check text-primary me-2"></i> REST API development</li>
                    <li><i class="fas fa-check text-primary me-2"></i> MongoDB database operations</li>
                    <li><i class="fas fa-check text-primary me-2"></i> Container deployment projects</li>
                    <li><i class="fas fa-check text-primary me-2"></i> Final full‑stack capstone project</li>
                </ul>
            </div>
            <div class="col-md-6">
                <h2 class="section-title"><i class="fas fa-people-arrows"></i> Contributing</h2>
                <p>This repository contains course materials, resources, and project templates. Feel free to:</p>
                <ul class="list-unstyled ps-3">
                    <li><i class="fas fa-code-branch text-warning me-2"></i> Fork the repository</li>
                    <li><i class="fas fa-pull-request text-success me-2"></i> Submit pull requests for improvements</li>
                    <li><i class="fas fa-bug text-danger me-2"></i> Report issues or suggest enhancements</li>
                </ul>
            </div>
        </div>

        <!-- License & Contact -->
        <div class="row g-4 mb-5">
            <div class="col-md-6">
                <h2 class="section-title"><i class="fas fa-balance-scale"></i> License</h2>
                <p>This project is licensed under the <strong>MIT License</strong> – see the LICENSE file for details.</p>
            </div>
            <div class="col-md-6">
                <h2 class="section-title"><i class="fas fa-envelope"></i> Contact &amp; Support</h2>
                <p>For questions, suggestions, or collaboration opportunities, please <a href="#">open an issue</a> in this repository.</p>
            </div>
        </div>

    </div><!-- /container -->

    <!-- ===== FOOTER ===== -->
    <footer>
        <div class="container text-center">
            <p class="mb-0">
                <i class="fas fa-code me-2"></i> JavaScript Full Stack Course &bull; Built with <i class="fas fa-heart text-danger"></i> for developers
            </p>
            <small class="d-block mt-2 opacity-75">
                &copy; 2026 &bull; All Rights Reserved
            </small>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>