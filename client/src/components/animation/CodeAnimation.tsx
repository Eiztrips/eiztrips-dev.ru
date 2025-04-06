import { useEffect, useState } from 'react';

type CodeLanguage = 'javascript' | 'typescript' | 'java' | 'python';

interface CodeExamples {
  [key: string]: string[];
}

function CodeAnimation() {
  const [text, setText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  
  const codeExamples: CodeExamples = {
    javascript: [
      'function helloWorld() {',
      '  console.log("Hello, visitor!");',
      '  const skills = ["React", "Node.js", "TypeScript", "Java", "Python"];',
      '  ',
      '  for (const skill of skills) {',
      '    console.log(`I love coding with ${skill}`);',
      '  }',
      '  ',
      '  return {',
      '    message: "Welcome to my portfolio",',
      '    status: 200',
      '  };',
      '}',
      '',
      'helloWorld();',
      '',
      '// Спасибо за посещение моего сайта!'
    ],
    typescript: [
      'interface Skill {',
      '  name: string;',
      '  experience: number;',
      '}',
      '',
      'function helloWorld(): { message: string, status: number } {',
      '  console.log("Hello, TypeScript enthusiast!");',
      '  const skills: Skill[] = [',
      '    { name: "React", experience: 3 },',
      '    { name: "TypeScript", experience: 2 },',
      '    { name: "Node.js", experience: 3 }',
      '    { name: "Java", experience: 5 }',
      '    { name: "Python", experience: 8 }',
      '  ];',
      '  ',
      '  skills.forEach((skill: Skill) => {',
      '    console.log(`I have ${skill.experience} years experience with ${skill.name}`);',
      '  });',
      '  ',
      '  return {',
      '    message: "TypeScript makes coding safer",',
      '    status: 200',
      '  };',
      '}',
      '',
      'const result = helloWorld();'
    ],
    java: [
      'import java.util.List;',
      'import java.util.Arrays;',
      '',
      'public class Portfolio {',
      '    public static void main(String[] args) {',
      '        System.out.println("Hello Java developer!");',
      '        ',
      '        List<String> skills = Arrays.asList(',
      '            "Spring Boot", "Hibernate", "Java EE"',
      '        );',
      '        ',
      '        skills.forEach(skill -> {',
      '            System.out.println("I work with " + skill);',
      '        });',
      '    }',
      '    ',
      '    public static Response greet() {',
      '        return new Response("Java powers enterprise", 200);',
      '    }',
      '}',
      '',
      'class Response {',
      '    private String message;',
      '    private int status;',
      '    ',
      '    public Response(String message, int status) {',
      '        this.message = message;',
      '        this.status = status;',
      '    }',
      '}'
    ],
    python: [
      'def hello_world():',
      '    print("Hello, Python lover!")',
      '    ',
      '    skills = ["Django", "Flask", "FastAPI", "Data Science"]',
      '    ',
      '    for skill in skills:',
      '        print(f"I enjoy using {skill}")',
      '    ',
      '    return {',
      '        "message": "Python is elegant and powerful",',
      '        "status": 200',
      '    }',
      '',
      '',
      'class Project:',
      '    def __init__(self, name, tech_stack):',
      '        self.name = name',
      '        self.tech_stack = tech_stack',
      '    ',
      '    def describe(self):',
      '        stack_list = ", ".join(self.tech_stack)',
      '        return f"{self.name} built with {stack_list}"',
      '',
      '',
      'result = hello_world()',
      'print(result["message"])'
    ]
  };

  const getRandomLanguage = (): CodeLanguage => {
    const languages = Object.keys(codeExamples) as CodeLanguage[];
    return languages[Math.floor(Math.random() * languages.length)];
  };

  const [randomLanguage, setRandomLanguage] = useState<CodeLanguage>(getRandomLanguage());

  useEffect(() => {
    const codeLines = codeExamples[randomLanguage];
    
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        if (currentChar < codeLines[currentLine].length) {
          setText(prev => prev + codeLines[currentLine][currentChar]);
          setCurrentChar(currentChar + 1);
        } else {
          setText(prev => prev + '\n');
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }
      }, 200);

      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setText('');
        setCurrentLine(0);
        setCurrentChar(0);
        setRandomLanguage(getRandomLanguage());
      }, 5000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentLine, currentChar, randomLanguage]);

  return (
    <div className="code-animation">
      <div className="code-terminal">
        <pre>{text}<span className="cursor">|</span></pre>
      </div>
    </div>
  );
}

export default CodeAnimation;
