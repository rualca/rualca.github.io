import React from 'react';
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { Highlighter } from "@/components/ui/highlighter";

export default function Education() {
  return (
    <section id="education" className="w-full bg-white text-black pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-block mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-pixel">
              <Highlighter action="underline" color="#FFD700">
                Qualifications
              </Highlighter>
            </h2>
          </div>
          <div className="relative flex max-w-lg mx-auto flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-4">
            <Tree
              className="w-full bg-background overflow-hidden rounded-md"
              initialExpandedItems={["Education", "Certifications"]}
            >
              <Folder element="My Education" value="Education">
                <Folder element="Universidad de Valencia" value="UV">
                  <File value="UV-II">
                    <p>Ingeniería Informática (2009 – 2015)</p>
                  </File>
                </Folder>
                <Folder element="Platzi" value="Platzi-Edu">
                  <File value="Platzi-Courses">
                    <p>Multiple online courses (2014 – 2017)</p>
                  </File>
                </Folder>
              </Folder>
              <Folder element="My Certifications" value="Certifications">
                <Folder element="Coursera" value="Coursera">
                  <File value="Coursera-GenAI">
                    <p>Generative AI Applications Specialist (2025)</p>
                  </File>
                  <File value="Coursera-ML">
                    <p>Machine Learning with Python V2 (2025)</p>
                  </File>
                  <File value="Coursera-DataAnalysis">
                    <p>Data Analysis with Python (2025)</p>
                  </File>
                </Folder>
                <Folder element="Startups Institute SL" value="StartupsInstitute">
                  <File value="SI-CTO">
                    <p>Curso de CTO y Dirección en Tecnología (2024)</p>
                  </File>
                </Folder>
                <Folder element="Udacity" value="Udacity">
                  <File value="Udacity-Gemini">
                    <p>Gemini API by Google</p>
                  </File>
                </Folder>
                <Folder element="Codely" value="Codely">
                  <File value="Codely-DomainEvents">
                    <p>Curso de Modelado del Dominio: Eventos de Dominio (2023)</p>
                  </File>
                  <File value="Codely-Repositories">
                    <p>Curso de Modelado de Dominio: Repositorios (2023)</p>
                  </File>
                  <File value="Codely-BehaviorPatterns">
                    <p>Curso de Patrones de Diseño del Comportamiento (2022)</p>
                  </File>
                  <File value="Codely-TSAdvanced">
                    <p>Curso de Typescript Avanzado (2022)</p>
                  </File>
                  <File value="Codely-SOLID">
                    <p>Curso de Principios SOLID aplicados (2022)</p>
                  </File>
                  <File value="Codely-Hexagonal">
                    <p>Curso en Arquitectura Hexagonal (2022)</p>
                  </File>
                </Folder>
                <Folder element="Platzi" value="Platzi-Cert">
                  <File value="Platzi-Mentoring">
                    <p>Curso de Mentoring y Coaching para Líderes (2024)</p>
                  </File>
                  <File value="Platzi-CleanArch">
                    <p>Curso de Arquitecturas Limpias para desarrollo de software (2023)</p>
                  </File>
                  <File value="Platzi-CreationalPatterns">
                    <p>Curso de Patrones de Diseño Creacionales en JavaScript (2023)</p>
                  </File>
                  <File value="Platzi-CleanCode">
                    <p>Curso de Clean Code en JavaScript (2023)</p>
                  </File>
                  <File value="Platzi-PromptEng">
                    <p>Prompt Engineering con ChatGPT (2023)</p>
                  </File>
                  <File value="Platzi-Benchmarking">
                    <p>Curso de Benchmarking (2023)</p>
                  </File>
                  <File value="Platzi-DesignSystem">
                    <p>Curso de Patrones y Componentes en un Sistema de Diseño (2023)</p>
                  </File>
                  <File value="Platzi-ProductMgmt">
                    <p>Curso de Product Management (2023)</p>
                  </File>
                  <File value="Platzi-ReactRedux">
                    <p>Curso Profesional de React.js y Redux (2022)</p>
                  </File>
                  <File value="Platzi-EngMgmt">
                    <p>Curso de Engineering Management (2022)</p>
                  </File>
                  <File value="Platzi-TechMgmt">
                    <p>Curso de Management en Tecnología (2022)</p>
                  </File>
                  <File value="Platzi-AWS">
                    <p>Curso de Cloud Computing con AWS (2022)</p>
                  </File>
                  <File value="Platzi-AWSFundamentals">
                    <p>Curso de fundamentos de AWS Cloud</p>
                  </File>
                  <File value="Platzi-DataScience">
                    <p>Programa de Data Science e Inteligencia Artificial (2020)</p>
                  </File>
                  <File value="Platzi-DesignThinking">
                    <p>Curso de Design Thinking (2018)</p>
                  </File>
                  <File value="Platzi-Prototipos">
                    <p>Desarrollo de Prototipos (2018)</p>
                  </File>
                  <File value="Platzi-LEAN">
                    <p>Desarrollo de productos con metodología LEAN (2018)</p>
                  </File>
                  <File value="Platzi-UX">
                    <p>Curso de Diseño de Interfaces y UX (2018)</p>
                  </File>
                  <File value="Platzi-NodeJS">
                    <p>Curso Avanzado de NodeJS (2017)</p>
                  </File>
                  <File value="Platzi-Angular4">
                    <p>Curso de Angular 4 (2017)</p>
                  </File>
                  <File value="Platzi-BigData">
                    <p>Curso de Big Data y Ciencia de Datos (2017)</p>
                  </File>
                  <File value="Platzi-Angular2">
                    <p>Curso de Angular 2 (2017)</p>
                  </File>
                  <File value="Platzi-PostCSS">
                    <p>Diseño web con PostCSS (2016)</p>
                  </File>
                  <File value="Platzi-Marcas">
                    <p>Curso de Diseño Visual de Marcas (2016)</p>
                  </File>
                  <File value="Platzi-RRPP">
                    <p>Curso de Relaciones Públicas (2016)</p>
                  </File>
                  <File value="Platzi-Marca">
                    <p>Curso de Construcción de Marca (2016)</p>
                  </File>
                  <File value="Platzi-Email">
                    <p>Curso de Email Marketing (2016)</p>
                  </File>
                  <File value="Platzi-iOS-ObjC">
                    <p>Curso de iOS con Objective-C (2014)</p>
                  </File>
                  <File value="Platzi-iOS-Swift">
                    <p>Curso de Desarrollo para iOS con Swift (2014)</p>
                  </File>
                  <File value="Platzi-Cocos2D">
                    <p>Curso de Programación de Juegos en iOS usando Cocos2D</p>
                  </File>
                </Folder>
                <Folder element="Scrum Manager" value="ScrumManager">
                  <File value="SM-Acreditado">
                    <p>Scrum Manager - Acreditado</p>
                  </File>
                </Folder>
              </Folder>
            </Tree>
          </div>
        </div>
      </div>
    </section>
  );
}