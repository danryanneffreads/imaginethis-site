#!/usr/bin/env python3
"""Generate ResumeMMCA matching the original resume's formatting."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import Color
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas

# ── Register fonts ──────────────────────────────────────────────────────
FONT_DIR = "/tmp/fonts"
pdfmetrics.registerFont(TTFont("NotoSerif-Bold", "/tmp/fonts/NotoSerif-Bold-Clean.ttf"))
pdfmetrics.registerFont(TTFont("OpenSans-Regular", f"{FONT_DIR}/OpenSans-Regular.ttf"))
pdfmetrics.registerFont(
    TTFont("OpenSans-SemiBold", f"{FONT_DIR}/OpenSans-SemiBold.ttf")
)
pdfmetrics.registerFont(TTFont("OpenSans-Bold", f"{FONT_DIR}/OpenSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("OpenSans-Light", f"{FONT_DIR}/OpenSans-Light.ttf"))
pdfmetrics.registerFont(
    TTFont("OpenSans-Italic", f"{FONT_DIR}/OpenSans-Italic-Static.ttf")
)

# ── Colors from original PDF ───────────────────────────────────────────
TEAL = Color(0.176471, 0.54902, 0.54902)
DARK_NAVY = Color(0.176471, 0.215686, 0.282353)
MED_GRAY_BLUE = Color(0.443137, 0.501961, 0.588235)
DARK_GRAY_BLUE = Color(0.290196, 0.333333, 0.407843)

# ── Layout constants ───────────────────────────────────────────────────
W, H = letter
M_LEFT = 60
M_RIGHT = 60
M_TOP = 91
CONTENT_W = W - M_LEFT - M_RIGHT

# ── Helper functions ───────────────────────────────────────────────────


def draw_wrapped_text(c, text, x, y, width, font, size, color, leading=None):
    if leading is None:
        leading = size * 1.35
    c.setFont(font, size)
    c.setFillColor(color)
    words = text.split()
    lines = []
    current_line = ""
    for word in words:
        test = current_line + " " + word if current_line else word
        if c.stringWidth(test, font, size) <= width:
            current_line = test
        else:
            if current_line:
                lines.append(current_line)
            current_line = word
    if current_line:
        lines.append(current_line)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_bullet_list(c, items, x, y, width, font, size, color, leading=None):
    if leading is None:
        leading = size * 1.4
    c.setFont(font, size)
    c.setFillColor(color)
    bullet_w = c.stringWidth("•  ", font, size)
    text_w = width - bullet_w
    for item in items:
        words = item.split()
        lines = []
        current_line = ""
        for word in words:
            test = current_line + " " + word if current_line else word
            if c.stringWidth(test, font, size) <= text_w:
                current_line = test
            else:
                if current_line:
                    lines.append(current_line)
                current_line = word
        if current_line:
            lines.append(current_line)
        for i, line in enumerate(lines):
            if i == 0:
                c.drawString(x, y, f"•  {line}")
            else:
                c.drawString(x + bullet_w, y, line)
            y -= leading
    return y


def draw_two_col_bullets(c, items, x, y, width, font, size, color, leading=None):
    if leading is None:
        leading = size * 1.35
    half_w = width / 2 - 8
    c.setFont(font, size)
    c.setFillColor(color)
    bullet_w = c.stringWidth("•  ", font, size)
    text_w = half_w - bullet_w

    def wrap_item(text):
        words = text.split()
        lines = []
        current = ""
        for word in words:
            test = current + " " + word if current else word
            if c.stringWidth(test, font, size) <= text_w:
                current = test
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
        return lines

    col1_items = items[:6]
    col2_items = items[6:]
    start_y = y
    for col_x, col_items_list in [(x, col1_items), (x + half_w + 16, col2_items)]:
        col_y = start_y
        for item in col_items_list:
            lines = wrap_item(item)
            c.drawString(col_x, col_y, f"•  {lines[0]}")
            for extra in lines[1:]:
                col_y -= leading
                c.drawString(col_x + bullet_w, col_y, extra)
            col_y -= leading
        y = min(y, col_y)
    return y


def section_header(c, text, x, y, extra_space_before=0):
    y -= extra_space_before
    c.setFont("OpenSans-Bold", 10.5)
    c.setFillColor(DARK_NAVY)
    c.drawString(x, y, text)
    c.setStrokeColor(TEAL)
    c.setLineWidth(0.6)
    c.line(x, y - 3, x + c.stringWidth(text, "OpenSans-Bold", 10.5), y - 3)
    return y - 14


def draw_job(c, title, location_dates, description, bullets, x, y, content_w):
    c.setFont("OpenSans-Bold", 9.5)
    c.setFillColor(DARK_NAVY)
    c.drawString(x, y, title)
    y -= 13
    c.setFont("OpenSans-Italic", 9.0)
    c.setFillColor(MED_GRAY_BLUE)
    c.drawString(x, y, location_dates)
    y -= 13
    if description:
        y = draw_wrapped_text(
            c,
            description,
            x,
            y,
            content_w,
            "OpenSans-Regular",
            9.0,
            DARK_GRAY_BLUE,
            leading=12.5,
        )
        y -= 5
    if bullets:
        y = draw_bullet_list(
            c,
            bullets,
            x,
            y,
            content_w,
            "OpenSans-Regular",
            9.0,
            DARK_GRAY_BLUE,
            leading=12.5,
        )
    y -= 6
    return y


# ── Build PDF ──────────────────────────────────────────────────────────
output_path = "/workspace/Daniel_Neff_ResumeMMCA.pdf"
c = canvas.Canvas(output_path, pagesize=letter)
c.setTitle("ResumeMMCA - Daniel Neff")
c.setAuthor("Kortix")

y = H - M_TOP

# ── NAME ───────────────────────────────────────────────────────────────
c.setFont("NotoSerif-Bold", 26)
c.setFillColor(TEAL)
c.drawString(M_LEFT, y, "DANIEL NEFF")
y -= 18

# ── Contact line ───────────────────────────────────────────────────────
c.setFont("OpenSans-Regular", 9.0)
c.setFillColor(MED_GRAY_BLUE)
c.drawString(
    M_LEFT,
    y,
    "Madison, Wisconsin  |  English (native)  |  Spanish (conversational proficiency)",
)
y -= 20

# ── Title ──────────────────────────────────────────────────────────────
c.setFont("OpenSans-SemiBold", 10.5)
c.setFillColor(DARK_NAVY)
c.drawString(M_LEFT, y, "COMMUNITY ENGAGEMENT & OPERATIONS LEADER")
y -= 15

# ── Skills line ────────────────────────────────────────────────────────
c.setFont("OpenSans-Light", 9.0)
c.setFillColor(MED_GRAY_BLUE)
c.drawString(
    M_LEFT,
    y,
    "Facilitation  •  Public Engagement  •  Team Leadership  •  Training & Mentorship  •  Cross-Functional Coordination",
)
y -= 8

# ── Teal divider line ──────────────────────────────────────────────────
c.setStrokeColor(TEAL)
c.setLineWidth(1.2)
c.line(M_LEFT, y, W - M_RIGHT, y)
y -= 18

# ── PROFESSIONAL SUMMARY ──────────────────────────────────────────────
y = section_header(c, "PROFESSIONAL SUMMARY", M_LEFT, y)

summary_paragraphs = [
    "Community-oriented operations and engagement leader with more than 20 years of experience supporting large-scale public-facing service environments through leadership, training, communication, and operational coordination. Known for creating calm, welcoming, and well-functioning environments where people feel supported, informed, and able to participate meaningfully.",
    "Extensive experience leading supervisors and front-line teams, developing training and communication practices, coordinating across departments, and helping organizations navigate operational and cultural change with clarity and consistency. Strong interest in how public spaces, creative environments, and community-centered institutions foster connection, dialogue, and belonging.",
    "Brings a combination of operational leadership, facilitation instincts, systems thinking, and creative engagement, with experience spanning organizational coordination, public interaction, digital project design, and community-oriented creative work.",
]

for para in summary_paragraphs:
    y = draw_wrapped_text(
        c,
        para,
        M_LEFT,
        y,
        CONTENT_W,
        "OpenSans-Regular",
        9.0,
        DARK_GRAY_BLUE,
        leading=13.2,
    )
    y -= 5
y -= 4

# ── CORE STRENGTHS ────────────────────────────────────────────────────
y = section_header(c, "CORE STRENGTHS", M_LEFT, y)
y -= 2

core_strengths = [
    "Community Engagement & Public-Facing Environments",
    "Team Leadership & Staff Development",
    "Facilitation & Cross-Functional Communication",
    "Training, Mentorship & Onboarding",
    "Visitor & Participant Experience Thinking",
    "Operational Coordination in Complex Environments",
    "Policy & Procedure Communication",
    "Inclusive & Welcoming Environment Development",
    "Systems Thinking & Organizational Alignment",
    "Public Interaction & Relationship Building",
    "Process Improvement & Organizational Clarity",
    "Creative Digital Project Development",
]

y = draw_two_col_bullets(
    c,
    core_strengths,
    M_LEFT,
    y,
    CONTENT_W,
    "OpenSans-Regular",
    9.0,
    DARK_GRAY_BLUE,
    leading=13,
)
y -= 8

# ── PROFESSIONAL EXPERIENCE ──────────────────────────────────────────
y = section_header(c, "PROFESSIONAL EXPERIENCE", M_LEFT, y)

# Job 1: Floor Operations Coordinator
y = draw_job(
    c,
    "CapTel, Inc. — Floor Operations Coordinator",
    "Madison, WI  |  September 2008 – October 2025",
    "Supported daily operations within a large-scale, technology-enabled accessibility service environment serving people nationwide.",
    [
        "Coordinated communication and operational alignment across multiple supervision layers and administrative teams supporting multi-shift operations",
        "Helped create stable, well-functioning environments during periods of organizational, staffing, procedural, and technology change",
        "Led training, onboarding, and development initiatives supporting supervisors and administrative staff",
        "Conducted interviews, participated in hiring and promotion decisions, and supported employee growth and readiness",
        "Developed and maintained operational policies, procedural documentation, and internal communication materials designed to improve organizational clarity and consistency",
        "Supported cross-department collaboration between operations, leadership, training, and administrative teams",
        "Provided guidance and decision support during high-pressure operational situations requiring communication, judgment, and coordination across teams",
        "Helped reinforce workplace culture centered on professionalism, accountability, communication, and support",
        "Built trust across leadership and front-line layers through consistent communication and calm problem-solving",
    ],
    M_LEFT,
    y,
    CONTENT_W,
)

# ── Page break ─────────────────────────────────────────────────────────
c.showPage()

y = H - M_TOP

# Job 2: CA Supervisor
y = draw_job(
    c,
    "CapTel, Inc. — CA Supervisor",
    "Madison, WI  |  May 2005 – September 2008",
    "Led teams within a fast-paced public-facing communication accessibility environment.",
    [
        "Supervised and supported front-line employees in a high-volume service setting",
        "Conducted coaching, performance discussions, and employee development support",
        "Helped maintain a consistent, supportive, and accountable team environment",
        "Reinforced communication standards, operational procedures, and quality expectations",
        "Assisted employees through operational and procedural transitions",
    ],
    M_LEFT,
    y,
    CONTENT_W,
)

# Job 3: Captioning Assistant
y = draw_job(
    c,
    "CapTel, Inc. — Captioning Assistant",
    "Madison, WI  |  October 2004 – May 2005",
    "Provided real-time captioning support for individuals with hearing loss within a live communications environment.",
    [
        "Delivered accurate and responsive communication support in time-sensitive situations",
        "Supported accessibility and communication inclusion for a diverse user population",
        "Applied bilingual English/Spanish communication skills in service interactions",
    ],
    M_LEFT,
    y,
    CONTENT_W,
)

# ── COMMUNITY, CREATIVE & DIGITAL PROJECTS ────────────────────────────
# Add extra space before this ALL CAPS section header
y = section_header(
    c, "COMMUNITY, CREATIVE & DIGITAL PROJECTS", M_LEFT, y, extra_space_before=6
)

# Mandalafy
c.setFont("OpenSans-Bold", 9.5)
c.setFillColor(DARK_NAVY)
c.drawString(M_LEFT, y, "Mandalafy® — Creator")
y -= 13

c.setFont("OpenSans-Regular", 9.0)
c.setFillColor(DARK_GRAY_BLUE)
y = draw_wrapped_text(
    c,
    "Designed and developed an interactive creative platform centered on visual design, participation, and guided user experience.",
    M_LEFT,
    y,
    CONTENT_W,
    "OpenSans-Regular",
    9.0,
    DARK_GRAY_BLUE,
    leading=12.5,
)
y -= 5

y = draw_bullet_list(
    c,
    [
        "Built structured creative workflows allowing users to create personalized visual artwork through an accessible step-by-step process",
        "Designed user interaction pathways focused on curiosity, exploration, and ease of participation",
        "Managed project structure, workflow design, implementation, and ongoing iteration using WordPress and AI-assisted tools",
        "Explored how digital environments can support creativity, self-expression, and meaningful engagement",
    ],
    M_LEFT,
    y,
    CONTENT_W,
    "OpenSans-Regular",
    9.0,
    DARK_GRAY_BLUE,
    leading=12.5,
)
y -= 2

# Additional Community section
c.setFont("OpenSans-Bold", 9.5)
c.setFillColor(DARK_NAVY)
c.drawString(M_LEFT, y, "Additional Community & Creative Engagement")
y -= 13

y = draw_bullet_list(
    c,
    [
        "Participated in community-oriented placemaking and public-space initiatives in Madison",
        "Longstanding personal involvement in visual art, creative practice, community spaces, and public engagement",
        "Strong interest in the relationship between conversation, participation, creativity, and public life",
    ],
    M_LEFT,
    y,
    CONTENT_W,
    "OpenSans-Regular",
    9.0,
    DARK_GRAY_BLUE,
    leading=12.5,
)
y -= 2

# ── EDUCATION ──────────────────────────────────────────────────────────
# Add extra space before this ALL CAPS section header
y = section_header(c, "EDUCATION", M_LEFT, y, extra_space_before=6)

c.setFont("OpenSans-Bold", 9.5)
c.setFillColor(DARK_NAVY)
c.drawString(M_LEFT, y, "Washington University in St. Louis")
y -= 12

c.setFont("OpenSans-Regular", 9.0)
c.setFillColor(DARK_GRAY_BLUE)
c.drawString(M_LEFT, y, "B.A. Spanish Language & Literature  |  Minor: Psychology")
y -= 14

c.setFont("OpenSans-Bold", 9.5)
c.setFillColor(DARK_NAVY)
c.drawString(M_LEFT, y, "University of Salamanca — Salamanca, Spain")
y -= 12

c.setFont("OpenSans-Regular", 9.0)
c.setFillColor(DARK_GRAY_BLUE)
c.drawString(M_LEFT, y, "Junior Year Abroad Program")
y -= 16

# ── ADDITIONAL STRENGTHS ──────────────────────────────────────────────
# Add extra space before this ALL CAPS section header
y = section_header(c, "ADDITIONAL STRENGTHS", M_LEFT, y, extra_space_before=6)
y -= 2

y = draw_bullet_list(
    c,
    [
        "Calm leadership presence in dynamic and high-pressure environments",
        "Strong written and verbal communication skills",
        "Comfortable engaging with diverse groups and public-facing environments",
        "Experienced supporting organizational change and team coordination",
        "Bilingual communication capability in English and Spanish",
    ],
    M_LEFT,
    y,
    CONTENT_W,
    "OpenSans-Regular",
    9.0,
    DARK_GRAY_BLUE,
    leading=12.5,
)

# ── Save ───────────────────────────────────────────────────────────────
c.save()
print(f"Generated: {output_path}")
