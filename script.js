const roleSkills = {
  "Data Scientist": [
    "python",
    "machine learning",
    "pandas",
    "numpy",
    "scikit-learn",
    "statistics",
    "sql",
    "data analysis",
    "visualization",
    "regression",
    "classification",
    "model evaluation",
  ],
  "Python Developer": [
    "python",
    "django",
    "flask",
    "rest api",
    "sql",
    "git",
    "unit testing",
    "backend",
    "oop",
    "deployment",
  ],
  "Java Developer": [
    "java",
    "spring boot",
    "hibernate",
    "rest api",
    "sql",
    "maven",
    "git",
    "microservices",
    "oop",
    "data structures",
  ],
  "Web Developer": [
    "html",
    "css",
    "javascript",
    "react",
    "node.js",
    "responsive design",
    "frontend",
    "rest api",
    "git",
    "ui",
  ],
  HR: [
    "recruitment",
    "screening",
    "onboarding",
    "payroll",
    "communication",
    "employee engagement",
    "hr policies",
    "talent acquisition",
    "interview coordination",
  ],
  "DevOps Engineer": [
    "linux",
    "docker",
    "kubernetes",
    "ci cd",
    "jenkins",
    "aws",
    "monitoring",
    "scripting",
    "git",
    "terraform",
    "automation",
  ],
};

const aliases = {
  sklearn: "scikit-learn",
  "scikit learn": "scikit-learn",
  rest: "rest api",
  api: "rest api",
  apis: "rest api",
  "object oriented programming": "oop",
  "object-oriented programming": "oop",
  cicd: "ci cd",
  "ci/cd": "ci cd",
  nodejs: "node.js",
};

const sampleResume = `Ananya Sharma
Data Science Intern

Built machine learning models using Python, pandas, numpy, scikit-learn, SQL, regression, classification, and model evaluation. Created dashboards and visualizations to explain data analysis results to business teams.`;

const resumeText = document.querySelector("#resumeText");
const targetRole = document.querySelector("#targetRole");
const analyzeBtn = document.querySelector("#analyzeBtn");
const clearBtn = document.querySelector("#clearBtn");
const sampleBtn = document.querySelector("#sampleBtn");

const scoreValue = document.querySelector("#scoreValue");
const predictedRole = document.querySelector("#predictedRole");
const matchLevel = document.querySelector("#matchLevel");
const matchingSkills = document.querySelector("#matchingSkills");
const missingSkills = document.querySelector("#missingSkills");
const recommendation = document.querySelector("#recommendation");

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasSkill(text, skill) {
  const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\ /g, "\\s+");
  const pattern = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i");
  return pattern.test(text);
}

function extractSkills(text) {
  const normalized = normalizeText(text);
  const skillBank = new Set(Object.values(roleSkills).flat());
  Object.keys(aliases).forEach((skill) => skillBank.add(skill));

  const found = new Set();
  skillBank.forEach((skill) => {
    if (hasSkill(normalized, skill)) {
      found.add(aliases[skill] || skill);
    }
  });
  return [...found].sort();
}

function predictRole(foundSkills) {
  let bestRole = "-";
  let bestScore = -1;

  Object.entries(roleSkills).forEach(([role, skills]) => {
    const matches = skills.filter((skill) => foundSkills.includes(skill)).length;
    const score = matches / skills.length;
    if (score > bestScore) {
      bestScore = score;
      bestRole = role;
    }
  });

  return bestRole;
}

function renderPills(container, skills, type, emptyText) {
  container.innerHTML = "";
  container.classList.remove("empty");

  if (!skills.length) {
    container.textContent = emptyText;
    container.classList.add("empty");
    return;
  }

  skills.forEach((skill) => {
    const pill = document.createElement("span");
    pill.className = `skill-pill ${type}`;
    pill.textContent = skill;
    container.appendChild(pill);
  });
}

function getMatchLevel(score) {
  if (score >= 8) return "Strong";
  if (score >= 5) return "Moderate";
  return "Weak";
}

function analyzeResume() {
  const text = resumeText.value.trim();
  const selectedRole = targetRole.value;

  if (!text) {
    recommendation.textContent = "Please paste resume text before analyzing.";
    recommendation.className = "recommendation weak";
    return;
  }

  const foundSkills = extractSkills(text);
  const expectedSkills = roleSkills[selectedRole];
  const matched = expectedSkills.filter((skill) => foundSkills.includes(skill));
  const missing = expectedSkills.filter((skill) => !foundSkills.includes(skill));
  const skillScore = matched.length / expectedSkills.length;
  const predicted = predictRole(foundSkills);
  const roleBonus = predicted === selectedRole ? 0.15 : 0;
  const finalScore = Math.min(10, (skillScore * 10 + roleBonus * 10)).toFixed(1);

  scoreValue.textContent = finalScore;
  predictedRole.textContent = predicted;
  matchLevel.textContent = getMatchLevel(Number(finalScore));

  renderPills(matchingSkills, matched, "match", "No matching role skills found.");
  renderPills(missingSkills, missing, "missing", "No missing skills.");

  recommendation.className = "recommendation";
  if (finalScore >= 8) {
    recommendation.textContent = "Strong match. This resume is well aligned with the selected role.";
    recommendation.classList.add("strong");
  } else if (finalScore >= 5) {
    recommendation.textContent =
      "Moderate match. Add more role-specific project details and mention the missing skills clearly.";
    recommendation.classList.add("medium");
  } else {
    recommendation.textContent =
      "Weak match. The resume needs more relevant skills, tools, and project experience for this role.";
    recommendation.classList.add("weak");
  }
}

function clearApp() {
  resumeText.value = "";
  scoreValue.textContent = "0.0";
  predictedRole.textContent = "-";
  matchLevel.textContent = "-";
  renderPills(matchingSkills, [], "match", "Analyze a resume to see matches.");
  renderPills(missingSkills, [], "missing", "Select a role and analyze a resume.");
  recommendation.textContent =
    "Add resume text and run the analyzer to get a frontend-only suitability estimate.";
  recommendation.className = "recommendation";
}

analyzeBtn.addEventListener("click", analyzeResume);
clearBtn.addEventListener("click", clearApp);
sampleBtn.addEventListener("click", () => {
  targetRole.value = "Data Scientist";
  resumeText.value = sampleResume;
  analyzeResume();
});
