import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, ExternalLink, ArrowRight, Menu, X, Download, MapPin } from 'lucide-react'

const withBase = (p) => {
  const clean = p.replace(/^\/+/, '');   // remove leading slash
  return new URL(clean, import.meta.env.BASE_URL).pathname;
};

const SITE = {
  name: 'Zain Majumder',
  role: 'Software Developer',
  location: 'Gaithersburg, MD',
  tagline: 'I design and build meaningful software.',
  email: 'majumderzain@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/zain-majumder/'
  },
  resumeUrl: new URL('resume.pdf', import.meta.env.BASE_URL).pathname
}

const HIGHLIGHTS = [
  {
    title: 'Apian Event-Based Sensor Research Project',
    description: 'As part of a four-year collaborative research effort, I contributed to the development of a system that uses event-based vision sensors to study honeybee populations in real time. Traditional hive monitoring techniques often rely on indirect measures that provide only partial insights into colony health, while our project focused on directly tracking the movement of bees at the hive entrance, enabling a more accurate understanding of colony activity.\nI helped install and operate a neuromorphic vision sensor designed to detect subtle, rapid changes in light. Unlike conventional cameras, which capture data frame by frame, these sensors only record where movement occurs. This makes them particularly well-suited for monitoring bees. The system was able to capture bees flying in and out of the hive with minimal delay, providing a continuous picture of hive activity without the need for invasive hive modifications.\nTo validate the technology, I worked on pairing the event-based sensor with conventional cameras and then comparing the algorithm’s bee counts to human-verified footage. Traditional video systems struggled to track the bees, and the event-based approach proved far more efficient and precise.\nThe results of this project highlight the potential of event-based sensing for ecological research and precision agriculture. This technology could help beekeepers respond more quickly to colony stressors, such as disease or other environmental hazards. With further development, the system may also serve as a scalable tool for monitoring pollinator health worldwide.',
    image: '/honeybee.jpg'
  },
  {
    title: 'AI Data Labeler at DataAnnotation',
    description: 'As an AI Data Labeler at DataAnnotation, I worked on evaluating the performance of large language models in solving programming and software engineering challenges. My role involved reviewing model-generated solutions across a wide range of programming languages, from Python and Java to web development technologies. I helped ensure that outputs aligned with real-world coding standards and problem-solving expectations.\nI critically analyzed the reasoning process behind model responses, identifying strengths, weaknesses, and edge cases where models performed inconsistently. This required both technical expertise and an eye for detail, as even minor logical flaws or inefficiencies could significantly impact a solution’s quality.\nMy contributions supported the broader goal of improving AI-assisted coding tools, which have the potential to make software development more accessible and efficient. By providing structured feedback on many examples, I helped refine model behavior, ultimately contributing to the advancement of generative AI systems in programming contexts.',
    image: '/chatbot-conversation.jpg'
  },
  {
    title: 'Puzzle Writing and Community Involvement',
    description: 'I am an avid puzzlehunt enthusiast and creator, with a deep appreciation for the unique style of problem-solving these events encourage. Puzzlehunts are rooted in the puzzle-solving traditions of crosswords, sudokus, and similar mental challenges. However, unlike these standard puzzle types, the puzzles in puzzlehunts do not provide straightforward instructions. Instead, they challenge solvers to identify hidden patterns and deduce what needs to be done to solve the puzzle. This kind of play combines collaboration, pattern recognition, and creativity, and it’s a tradition I’ve both enjoyed as a participant and contributed to as a writer and organizer.\nI was a writer for the INTEGIRLS Puzzle Hunt, a competition designed to encourage middle and high school girls to explore problem-solving and STEM fields in an inclusive, welcoming way. In this role, I authored original puzzles that combined wordplay and logic with lateral thinking. My work contributed to building an engaging hunt that resonated with students across the world, sparking curiosity and confidence for new solvers.\nAt the University of Maryland, I also helped organize and write for an in-person puzzlehunt that led teams across campus. This event blended puzzlehunt design with physical exploration, as participants solved puzzles that pointed them to new locations, where the hunt would continue. Designing a location-based hunt brought additional challenges related to managing the logistics of teams moving around campus, but it was worth the effort to create an exciting, in-person event that felt strongly connected to the culture of the University of Maryland.\nPuzzlehunts are collaborative explorations of logic and discovery which reward persistence and teamwork as much as individual insight. Through both writing and solving hunts, I’ve developed sharper problem-solving and design skills, as well as a deeper appreciation for how playful challenges can bring people together.',
    image: '/scrabble.jpg'
  },
]

const SKILLS = [
  'Artificial intelligence','Data analytics','Data viz','Java','C',
  'Python','HTML','CSS','JavaScript', 'C++', 'SQL'
]

const navItems = [
  {id:'home',label:'Home'},
  {id:'about',label:'About'},
  {id:'highlights',label:'Highlights'},
  {id:'contact',label:'Contact'}
]

function useScrollSpy(ids, offset=80) {
  const [active,setActive] = useState(ids[0])
  useEffect(()=>{
    const h=()=>{
      const y = window.scrollY+offset+1
      for(let i=ids.length-1;i>=0;i--){
        const el=document.getElementById(ids[i])
        if(el && el.offsetTop<=y){
          setActive(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll',h,{passive:true})
    h()
    return()=>window.removeEventListener('scroll',h)
  },[ids,offset])
  return active
}

const scrollToId = id => {
  const el=document.getElementById(id)
  if(el) el.scrollIntoView({behavior:'smooth',block:'start'})
}
const classNames = (...a) => a.filter(Boolean).join(' ')

const Container = ({children}) =>
  <div className='mx-auto max-w-6xl px-4 md:px-6 lg:px-8'>
    {children}
  </div>

function NavBar(){
  const [open,setOpen]=useState(false)
  const active=useScrollSpy(navItems.map(n=>n.id))
  return(
    <header className='sticky top-0 z-40 border-b border-zinc-200/70 bg-white/70 backdrop-blur'>
      <Container>
        <div className='flex h-14 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400'/>
            <span className='text-sm font-semibold tracking-wide'>{SITE.name}</span>
          </div>
          <nav className='hidden gap-1 md:flex'>
            {navItems.map(item=>(
              <button
                key={item.id}
                onClick={()=>scrollToId(item.id)}
                className={classNames(
                  'rounded-full px-3 py-1 text-sm transition',
                  active===item.id
                  ?'bg-zinc-900 text-white'
                  :'hover:bg-zinc-100'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

        </div>
        {open&&(
          <div className='grid gap-2 pb-4 md:hidden'>
            {navItems.map(item=>(
              <button
                key={item.id}
                onClick={()=>{
                  setOpen(false)
                  scrollToId(item.id)
                }}
                className={classNames(
                  'rounded-lg px-3 py-2 text-left text-sm',
                  active===item.id?'bg-zinc-100':''
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </Container>
    </header>
  )
}

function Hero() {
  return (
    <section id='home' className='relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl'>
        <div className='absolute -left-10 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-300'/>
        <div className='absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gradient-to-br from-purple-400 to-pink-300'/>
      </div>
      <Container>
        <div className='grid items-center gap-10 py-16 md:grid-cols-2 md:py-24'>
          <motion.div
            initial={{opacity:0,y:16}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6}}
          >
            <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 shadow-sm'>
              <MapPin className='h-3.5 w-3.5'/> {SITE.location}
            </div>
            <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>{SITE.name}</h1>
            <p className='mt-2 text-lg text-zinc-600'>{SITE.role}</p>
            <p className='mt-4 max-w-xl text-zinc-700'>{SITE.tagline}</p>
            <div className='mt-6 flex flex-wrap items-center gap-3'>
              <a
                href={SITE.resumeUrl}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:shadow-md'
              >
                <Download className='h-4 w-4'/> Download Résumé
              </a>
              <button
                onClick={()=>scrollToId('contact')}
                className='inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100'
              >
                Contact Me <ArrowRight className='h-4 w-4'/>
              </button>
              <div className='ml-2 flex items-center gap-2'>
                <a
                  className='rounded-full border border-zinc-300 p-2 transition hover:bg-zinc-100'
                  href={`mailto:${SITE.email}`}
                  aria-label='Email'
                >
                  <Mail className='h-4 w-4'/>
                </a>
                <a
                  className='rounded-full border border-zinc-300 p-2 transition hover:bg-zinc-100'
                  href={SITE.socials.linkedin}
                  target='_blank'
                  rel='noreferrer'
                  aria-label='LinkedIn'
                >
                  <Linkedin className='h-4 w-4'/>
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{opacity:0,y:16}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6,delay:0.1}}
            className='relative'
          >
            <div className='h-64 w-64 rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 p-1 shadow-lg md:ml-auto md:h-80 md:w-80'>
              <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white'>
                <img
                  src={withBase('hero-img.jpg')}
                  alt='An image of me by the water in Abu Dhabi.'
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function Highlights() {
  return (
    <section id='highlights' className='py-16 md:py-24'>
      <Container>
        <header className='mb-10'>
          <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>Highlights</h2>
        </header>

        <div className='space-y-20 md:space-y-28'>
          {HIGHLIGHTS.map((p) => (
            <article key={p.title} className='space-y-6'>
              <figure className='w-full'>
                <div className='relative aspect-[21/9] w-full sm:aspect-[16/6] md:aspect-[16/5]'>
                  <img
                    src={withBase(p.image)}
                    alt={p.title}
                    loading='lazy'
                    className='absolute inset-0 h-full w-full object-cover'
                  />
                </div>
              </figure>

              <div>
                <h3 className="text-xl font-semibold md:text-2xl">{p.title}</h3>
                <div className="mt-3 leading-relaxed text-zinc-700">
                  {(p.long ?? p.description).split('\n').map((line, idx) => (
                    <p key={idx} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}



function About() {
  return (
    <section id='about' className='border-t border-zinc-200 py-16 md:py-24'>
      <Container>
        <div className='grid items-start gap-10 md:grid-cols-3'>
          <div className='md:col-span-2'>
            <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>About</h2>
            <p className='mt-4 max-w-2xl text-zinc-700'>
              I am a recent computer science graduate seeking to leverage my education and programming skills in an exciting role.
            </p>
            <div className='mt-6 flex flex-wrap gap-2'>
              {SKILLS.map(s=>(
                <span
                  key={s}
                  className='rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700'
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className='rounded-2xl border border-zinc-200 bg-white p-4'>
            <h3 className='text-sm font-semibold'>At a glance</h3>
            <ul className='mt-3 space-y-2 text-sm text-zinc-600'>
              <li>Bachelor's Degree in Computer Science from the University of Maryland at College Park</li>
              <li>Years of experience with programming languages such as Java and Python</li>
              <li>A love for algorithms and creative problem solving</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Contact() {
  const [form,setForm]=useState({name:'',email:'',message:''})
  const mailto = useMemo(() => {
    const body = [
      form.message,
      '',
      `— ${form.name}${form.email ? ` <${form.email}>` : ''}`
    ].join('\n');

    const p = new URLSearchParams({
      subject: `Inquiry from ${form.name || 'your website'}`,
      body
    });

    return `mailto:${SITE.email}?${p.toString()}`;
  }, [form]);


  return (
    <section id='contact' className='border-t border-zinc-200 py-16 md:py-24'>
      <Container>
        <div className='grid gap-10 md:grid-cols-2'>
          <div>
            <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>Let’s work together</h2>
            <p className='mt-3 max-w-md text-zinc-700'>
              Tell me about your project, timeline, and goals. I’ll get back to you shortly.
            </p>
            <div className='mt-6 flex gap-3'>
              <a
                href={`mailto:${SITE.email}`}
                className='inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100'
              >
                <Mail className='h-4 w-4'/> {SITE.email}
              </a>
              <a
                href={SITE.socials.linkedin}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100'
              >
                <Linkedin className='h-4 w-4'/> LinkedIn
              </a>
            </div>
          </div>
          <form
            onSubmit={e=>{
              e.preventDefault()
              window.location.href=mailto
            }}
            className='rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm'
          >
            <div className='grid gap-4'>
              <div>
                <label htmlFor='name' className='text-sm font-medium'>Name</label>
                <input
                  id='name'
                  type='text'
                  required
                  value={form.name}
                  onChange={e=>setForm({...form,name:e.target.value})}
                  className='mt-1 w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none ring-0 transition placeholder:text-zinc-400 focus:border-zinc-500'
                  placeholder='Jane Doe'
                />
              </div>
              <div>
                <label htmlFor='email' className='text-sm font-medium'>Email</label>
                <input
                  id='email'
                  type='email'
                  required
                  value={form.email}
                  onChange={e=>setForm({...form,email:e.target.value})}
                  className='mt-1 w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none ring-0 transition placeholder:text-zinc-400 focus:border-zinc-500'
                  placeholder='you@company.com'
                />
              </div>
              <div>
                <label htmlFor='message' className='text-sm font-medium'>Message</label>
                <textarea
                  id='message'
                  required
                  rows='5'
                  value={form.message}
                  onChange={e=>setForm({...form,message:e.target.value})}
                  className='mt-1 w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none ring-0 transition placeholder:text-zinc-400 focus:border-zinc-500'
                  placeholder='What are you building?'
                />
              </div>
              <button
                type='submit'
                className='inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90'
              >
                Send Email <ArrowRight className='h-4 w-4'/>
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className='border-t border-zinc-200 py-10 text-sm text-zinc-500'>
      <Container>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className='flex items-center gap-3'>
            <a className='hover:underline' href='#home'>Back to top</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default function PersonalSite() {
  return (
    <div className='min-h-screen bg-white text-zinc-900 antialiased'>
      <NavBar/>
      <main>
        <Hero/>
        <About/>
        <Highlights/>
        <Contact/>
      </main>
      <Footer/>
    </div>
  )
}
