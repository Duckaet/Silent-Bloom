import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Code2,
  Database,
  Link,
  Server,
  Workflow
} from "lucide-react";

export default function TeamSection() {
  const team = [
    {
      name: "Raghvender Tyagi",
      role: "AI Research Lead",
      image: "/src/images/raghav.jpg"
    },
    {
      name: "Arnav Singh Tomar",
      role: "RAG Engineer",
      image: "/src/images/arnav.jpg"
    },
    {
      name: "Taniya Sumbul",
      role: "AI Engineer",
      image: "/src/images/taniya.jpg"
    },
    {
      name: "Paras Sharma",
      role: "Blockchain Developer",
      image: "/src/images/paras.jpg"
    }
  ];

  const technologies = [
    { name: "React.js", icon: Code2 },
    { name: "TensorFlow", icon: Brain },
    { name: "Flask", icon: Server },
    { name: "Solidity", icon: Database },
    { name: "Web3.js", icon: Link },
    { name: "Ethereum", icon: Workflow }
  ];

  return (
    <section id="team" className="py-20 bg-muted/50">
      <div className="container px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {team.map((member) => (
            <Card key={member.name}>
              <CardContent className="pt-6">
                <div className="aspect-square mb-4 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-center">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-center mb-8">Technologies Used</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {technologies.map((tech) => (
            <Card key={tech.name}>
              <CardContent className="p-4 flex flex-col items-center">
                <tech.icon className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">{tech.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}