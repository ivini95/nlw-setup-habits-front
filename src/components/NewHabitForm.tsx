
import * as Checkbox from '@radix-ui/react-checkbox';
import {Check} from 'phosphor-react'
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
    
]

export function NewHabitForm(){

    const [ title , setTitle] = useState('')

    const [ weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event : FormEvent){
        event.preventDefault()
      
        if (!title || weekDays.length === 0) {
            return
        }

        await api.post("habits", {
            title,
            weekDays,
        })

        setTitle('')
        setWeekDays([])
    }

    function handleToggleWeekDay(weekDay : number){
         if (weekDays.includes(weekDay)) {
             const weekDaysWithRemoveOne = weekDays.filter(day => day !== weekDay)

             setWeekDays(weekDaysWithRemoveOne)
         }else {
            const weekDayWithAddedOne = [...weekDays, weekDay]

            setWeekDays(weekDayWithAddedOne)
         }

         
    }

    return(
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label className="font-semibold leading-tight" htmlFor="title">Qual o seu comprometimento?</label>
            <input type='text' id="title" placeholder="ex.: Exercícios, Beber 2l de água, ..." autoFocus className="h-10 pg-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-zinc-900 " onChange={event => setTitle(event.target.value)} value={title}/>

            <label htmlFor="" className="font-semibold leading-tight mt-4">Qual a recorrência?</label>

            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map((day, i) => {
                    return (
                        <Checkbox.Root key ={day} className='flex items-center gap-3 group focus:outline-none' onCheckedChange={() => handleToggleWeekDay(i)} checked={weekDays.includes(i)}>
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-800 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white"/>
                            </Checkbox.Indicator>
                            </div>
                                
                            <span className=' text-white leading-tight '>
                                {day}
                            </span>
                        </Checkbox.Root>
                    )
                })}
            </div>
            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 focus:ring-offset-zinc-900">
                <Check size={20} weight="bold"/>
                Confimar
            </button>
        </form>
    )
}