import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import { InterviewCard } from '@/components/InterviewCard'


const page = () => {
  return (
    <>
        <section className='card-cta'>
                <div className='flex flex-col gap-6 max-w-lg'>
                      <h2>
                         Get Interview Ready with Ai-powered Practise And Feedback
                      </h2>
                      <p className='text-lg'>
                          Practise on real interview questions and get instant feedback
                      </p>
                     {/* "asChild" is used to make whole button take property of its child (i.e. Link) */}
                      <Button asChild className='btn-primary max-sm:w-full'> 
                              <Link href="/interview">Start an interview</Link>
                      </Button>
                </div>
                  <Image src="/robot2.png" alt='robo-dude' width={400} height={400} className='max-sm:hidden'/>
        </section>

         <section className='flex flex-col gap-6 mt-8'>
             <h2>Your interviews</h2>

             <div className='interviews-section'>
                         {/* &apos is used for apostiphy sign ' */}
                    {dummyInterviews.map((interview)=>(
                            <InterviewCard  {...interview} key={interview.id}/>
                    ))}
                    <p>You haven&apos;t taken any interviews yet</p>
             </div> 
         </section>

         <section className='flex flex-col gap-6 mt-8'>
             <h2>Take an interview</h2>
             <div className='interviews-section'>
                  {dummyInterviews.map((interview)=>(
                            <InterviewCard  {...interview} key={interview.id}/>
                    ))}
             </div>
             {/* npm i dayjs is used to show date and day in the cards inside your interviews section */}
         </section> 
    </>
  )
}

export default page