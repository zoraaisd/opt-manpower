"""
Seed script for Optimus Manpower platform.
Run with: python seed_data.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'optimus.settings')
django.setup()

from core.models import Job, Testimonial

# ─── CLEAR EXISTING ───────────────────────────────────────────────────────────
Job.objects.all().delete()
Testimonial.objects.all().delete()
print("Cleared existing data.")

# ─── JOBS ─────────────────────────────────────────────────────────────────────
jobs = [
    {
        "title": "Senior Software Engineer",
        "company_name": "TechNova Solutions",
        "description": "We are looking for a skilled Senior Software Engineer to join our growing team in Chennai. You will design and build scalable backend systems that power our flagship SaaS products.\n\nYou will work closely with product managers, designers, and other engineers to deliver high-quality software solutions that meet business requirements.",
        "location": "Chennai",
        "country": "India",
        "experience": "5–8 years",
        "salary": "₹18–28 LPA",
        "job_type": "Full Time",
        "category": "IT & Technology",
        "is_international": False,
        "requirements": "- 5+ years of Python/Django experience\n- Proficiency in PostgreSQL and Redis\n- Experience with REST API design\n- Strong knowledge of Git and CI/CD\n- Excellent communication skills",
        "benefits": "- Health insurance (self + family)\n- Annual performance bonus\n- 20 days paid leave\n- Remote-friendly Fridays\n- Learning & development budget",
        "status": "Published",
    },
    {
        "title": "Registered Nurse – ICU",
        "company_name": "Gulf Medical Group",
        "description": "Gulf Medical Group is hiring experienced ICU Registered Nurses for our premier hospitals across the UAE. This is an excellent opportunity to work in a world-class facility with state-of-the-art equipment and a supportive international team.",
        "location": "Dubai",
        "country": "UAE",
        "experience": "3+ years",
        "salary": "AED 8,000–12,000/month",
        "job_type": "Full Time",
        "category": "Healthcare",
        "visa_type": "Employment Visa (provided)",
        "is_international": True,
        "requirements": "- B.Sc Nursing or GNM\n- Valid nursing registration\n- 3+ years ICU experience\n- ACLS/BLS certification preferred\n- Good command of English",
        "benefits": "- Employment visa & relocation provided\n- Accommodation allowance\n- Round trip air ticket annually\n- Medical insurance\n- End of service gratuity",
        "status": "Published",
    },
    {
        "title": "HR Manager",
        "company_name": "Pinnacle Industries",
        "description": "We are seeking an experienced HR Manager to oversee all aspects of human resources for our manufacturing plant in Pune. You will be responsible for talent acquisition, employee relations, compliance, and organizational development.",
        "location": "Pune",
        "country": "India",
        "experience": "6–10 years",
        "salary": "₹10–16 LPA",
        "job_type": "Full Time",
        "category": "HR",
        "is_international": False,
        "requirements": "- MBA in HR or equivalent\n- 6+ years of HR generalist experience\n- Strong knowledge of Indian labor law\n- Proven experience in talent acquisition\n- Excellent interpersonal skills",
        "benefits": "- Performance bonus up to 20%\n- Company car / transport allowance\n- Health insurance (family floater)\n- PF & Gratuity\n- Annual company retreat",
        "status": "Published",
    },
    {
        "title": "Civil Site Engineer",
        "company_name": "Al-Arif Contracting",
        "description": "Al-Arif Contracting is a leading construction firm based in Riyadh. We are hiring Civil Site Engineers with experience in large-scale infrastructure and residential projects.",
        "location": "Riyadh",
        "country": "Saudi Arabia",
        "experience": "4–7 years",
        "salary": "SAR 6,000–9,000/month",
        "job_type": "Full Time",
        "category": "Engineering",
        "visa_type": "Work Permit (provided)",
        "is_international": True,
        "requirements": "- B.E./B.Tech in Civil Engineering\n- 4+ years site engineering experience\n- Proficiency in AutoCAD\n- Knowledge of Saudi Aramco/NEOM standards is a plus\n- Driving License",
        "benefits": "- Visa & relocation package\n- Accommodation provided\n- Annual leave ticket\n- Medical insurance\n- Tax-free salary",
        "status": "Published",
    },
    {
        "title": "Digital Marketing Executive",
        "company_name": "Blaze Digital Agency",
        "description": "Blaze Digital Agency is looking for a creative and data-driven Digital Marketing Executive to manage campaigns across Google, Meta, and LinkedIn for our diverse client portfolio.",
        "location": "Bengaluru",
        "country": "India",
        "experience": "2–4 years",
        "salary": "₹5–9 LPA",
        "job_type": "Full Time",
        "category": "Marketing",
        "is_international": False,
        "requirements": "- 2+ years digital marketing experience\n- Hands-on experience with Google Ads & Meta Ads\n- Knowledge of SEO, SEM, and analytics tools\n- Excellent written English\n- Creative mindset",
        "benefits": "- Flexible working hours\n- Health insurance\n- Performance incentives\n- Team outings & events\n- Career growth in fast-paced environment",
        "status": "Published",
    },
    {
        "title": "Chartered Accountant",
        "company_name": "Sterling Finance Ltd.",
        "description": "Sterling Finance Ltd. is a NBFC seeking a qualified Chartered Accountant to head our finance division. You will be responsible for statutory compliance, audit, taxation, and financial reporting.",
        "location": "Mumbai",
        "country": "India",
        "experience": "4–8 years post CA",
        "salary": "₹15–24 LPA",
        "job_type": "Full Time",
        "category": "Finance",
        "is_international": False,
        "requirements": "- Qualified CA (ICAI)\n- 4+ years post-qualification experience in NBFC/banking sector\n- Strong in IndAS/IFRS\n- Experience with tax audit and statutory filings\n- Excellent analytical skills",
        "benefits": "- ESOPs available\n- Variable pay up to 30%\n- Premium health insurance\n- Cab facility\n- Work-life balance culture",
        "status": "Published",
    },
    {
        "title": "Housekeeping Supervisor",
        "company_name": "Marriott International",
        "description": "Marriott Qatar is hiring experienced Housekeeping Supervisors for our 5-star luxury property in Doha. The candidate will oversee room cleaning operations and maintain the highest standards of cleanliness and guest satisfaction.",
        "location": "Doha",
        "country": "Qatar",
        "experience": "3–5 years",
        "salary": "QAR 3,500–4,800/month",
        "job_type": "Full Time",
        "category": "Operations",
        "visa_type": "QID Work Visa",
        "is_international": True,
        "requirements": "- Diploma in Hotel Management or equivalent\n- 3+ years housekeeping experience in 4/5 star hotels\n- Strong leadership skills\n- Attention to detail\n- Basic English communication",
        "benefits": "- Visa & air ticket provided\n- Accommodation & meals\n- Medical insurance\n- Service charge bonus\n- Annual leave",
        "status": "Published",
    },
    {
        "title": "Inside Sales Executive",
        "company_name": "CloudTech India",
        "description": "CloudTech is India's fastest growing SaaS company. We are looking for ambitious Inside Sales Executives to join our sales team and drive B2B software subscription growth.",
        "location": "Hyderabad",
        "country": "India",
        "experience": "1–3 years",
        "salary": "₹4–7 LPA + incentives",
        "job_type": "Full Time",
        "category": "Sales",
        "is_international": False,
        "requirements": "- 1+ year inside sales or tele-sales experience\n- Excellent verbal and written communication\n- Proficiency in CRM tools (Salesforce/Zoho)\n- Target-oriented mindset\n- Tech-savvy with good product demo skills",
        "benefits": "- Uncapped monthly incentives\n- Laptop provided\n- Health insurance\n- 5-day work week\n- Fast career progression",
        "status": "Published",
    },
]

created_jobs = []
for j in jobs:
    job = Job.objects.create(**j)
    created_jobs.append(job.title)

print(f"Created {len(created_jobs)} jobs: {', '.join(created_jobs)}")

# ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
testimonials_data = [
    {
        "name": "Priya Venkataraman",
        "role": "Software Engineer, Dubai",
        "review": "Optimus Manpower helped me secure an international opportunity that transformed my career. The guidance throughout the visa and relocation process was exceptional. I highly recommend them to anyone looking for Gulf opportunities.",
    },
    {
        "name": "Arjun Nair",
        "role": "ICU Nurse, Abu Dhabi",
        "review": "I was skeptical at first, but the team at Optimus Manpower was transparent and professional from day one. Within 6 weeks of registering, I had an offer letter in hand. They truly care about candidates.",
    },
    {
        "name": "Mohammed Farouk",
        "role": "Civil Engineer, Riyadh",
        "review": "The best placement consultancy I have worked with. They matched me with a role that fits my skills perfectly. The salary package negotiated was 20% above my expectations. Thank you Optimus Manpower!",
    },
    {
        "name": "Deepa Krishnamurthy",
        "role": "HR Manager, Bengaluru",
        "review": "Optimus Manpower understood my profile better than any other agency. They placed me in a senior role that aligned perfectly with my career goals. Professional, swift, and reliable.",
    },
    {
        "name": "Santhosh Kumar",
        "role": "Chartered Accountant, Mumbai",
        "review": "Top-notch service. The consultants took time to understand what I was looking for and presented only relevant opportunities. Landed a role with 40% salary hike within 30 days of registration.",
    },
]

for t in testimonials_data:
    Testimonial.objects.create(**t)

print(f"Created {len(testimonials_data)} testimonials.")
print("\nSeed data complete! The platform is ready.")
print("   Frontend: http://localhost:5173")
print("   Backend API: http://localhost:8000/api/")
print("   Admin: admin@optimusmanpower.com / Admin@123")



