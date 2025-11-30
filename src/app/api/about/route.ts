import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// GET - Get About content (public)
export async function GET() {
  try {
    await connectDB();

    let about = await About.findOne();

    // If no about exists, create default
    if (!about) {
      about = await About.create({
        title: {
          en: "About Me",
          fr: "À Propos"
        },
        professionalSummary: {
          en: "Professional Summary",
          fr: "Résumé Professionnel"
        },
        description: {
          en: "I'm a passionate Full Stack Developer with expertise in building scalable web applications and AI-powered solutions.",
          fr: "Je suis un développeur Full Stack passionné avec une expertise dans la création d'applications web évolutives et de solutions alimentées par l'IA."
        },
        description2: {
          en: "With 4+ years of experience, I specialize in Python, FastAPI, Next.js, and modern web technologies.",
          fr: "Avec plus de 4 ans d'expérience, je me spécialise en Python, FastAPI, Next.js et technologies web modernes."
        },
        description3: {
          en: "I'm dedicated to creating innovative solutions that make a real impact.",
          fr: "Je suis dévoué à créer des solutions innovantes qui ont un impact réel."
        },
        whatIDo: {
          en: "What I Do",
          fr: "Ce Que Je Fais"
        },
        whatIDoList: {
          en: [
            "Full Stack Web Development",
            "AI & Machine Learning Solutions",
            "RESTful & GraphQL API Design",
            "Cloud Infrastructure & DevOps",
            "Database Design & Optimization"
          ],
          fr: [
            "Développement Web Full Stack",
            "Solutions IA & Apprentissage Automatique",
            "Conception d'API RESTful & GraphQL",
            "Infrastructure Cloud & DevOps",
            "Conception et Optimisation de Bases de Données"
          ]
        },
        stats: {
          experience: {
            label: {
              en: "Years Experience",
              fr: "Années d'Expérience"
            },
            value: "4+"
          },
          projects: {
            label: {
              en: "Projects Completed",
              fr: "Projets Complétés"
            },
            value: "20+"
          },
          technologies: {
            label: {
              en: "Technologies",
              fr: "Technologies"
            },
            value: "15+"
          },
          location: {
            label: {
              en: "Location",
              fr: "Localisation"
            },
            value: {
              en: "Toronto, Canada",
              fr: "Toronto, Canada"
            }
          }
        }
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json(
      { error: "Failed to fetch about content" },
      { status: 500 }
    );
  }
}

// PUT - Update About content (admin only)
export async function PUT(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();
    const body = await request.json();

    let about = await About.findOne();

    if (!about) {
      about = await About.create(body);
    } else {
      about = await About.findByIdAndUpdate(about._id, body, {
        new: true,
        runValidators: true,
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about:", error);
    return NextResponse.json(
      { error: "Failed to update about content" },
      { status: 500 }
    );
  }
}
