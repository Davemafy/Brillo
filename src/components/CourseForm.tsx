import { useCourses } from '../hooks/useCourses'
import { supabase } from '../superbaseClient'
import { Bookmark, Hourglass, ImageDown, School, Star, Timer, X } from 'lucide-react'
import { Squircle } from 'ldrs/react'
import { useEffect, useRef, useState, type SubmitEventHandler } from 'react'
import { generateCourseSubtitle } from '../utils/ai'
import { useUser } from '../hooks/useUser'

interface CourseFormProps {
  setOpenModal: (open: boolean) => void
}

const CourseForm = ({ setOpenModal }: CourseFormProps) => {
  const { setCourses } = useCourses()
  const { user } = useUser()

  const previewRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [courseImg, setCourseImg] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const node = previewRef.current
    if (!node) return

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target?.files?.[0]

      if (file) {
        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)
        setCourseImg(file)
      }
    }

    node.addEventListener('change', handleChange)

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      node.removeEventListener('change', handleChange)
    }
  }, [])

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!courseImg) {
      alert('Please select an image first!')
      setLoading(false)
      return
    }

    const formData = new FormData(e.currentTarget)

    const courseName = formData.get('course')?.toString()
    if (!courseName) return

    const fileName = `courses/${Date.now()}-${courseName?.replace(/\s+/g, '-')}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('app-assets')
      .upload(fileName, courseImg, {
        contentType: courseImg.type // Ensures it's not 'octet-stream'
      })

    if (uploadError) {
      console.error('Upload failed:', uploadError.message)
      setLoading(false)
      return
    }

    // Get the permanent Public URL
    const { data: urlData } = supabase.storage.from('app-assets').getPublicUrl(fileName)

    const publicUrl = urlData.publicUrl

    const generatedSubtitle = await generateCourseSubtitle(courseName)

    const hours = parseFloat(formData.get('hrs') as string) || 0
    const minutes = parseFloat(formData.get('mins') as string) || 0
    const totalDuration = (hours + minutes / 60).toFixed(2)

    //console.log(subTitle);

    const { data: newCourse, error } = await supabase
      .from('courses')
      .insert([
        {
          user_id: user?.id,
          subtitle: generateCourseSubtitle,
          title: formData.get('course'),
          instructor: formData.get('instructor'),
          duration: totalDuration,
          rating: +(formData.get('rating') as string),
          progress: 0,
          img: publicUrl
        }
      ])
      .select()
      .single()

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }
    if (newCourse) {
      setCourses((courses) => [newCourse, ...courses])
      setLoading(false)
      setOpenModal(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='  relative ls:max-w-120 md:min-w-125 grid gap-4 p-6 pt-
        bg-white text-sm  border border-gray-400 min-w-0 ls:h-auto max-h-full overflow-y-auto w-full font-sm  rounded-2xl'
    >
      {loading && (
        <div className='absolute z-10 w-full bg-linear-to-r from-neutral-400/30 to-white/30  backdrop-blur-[0.2rem]  h-full grid place-content-center'>
          <Squircle size='37' stroke='5' strokeLength='0.15' bgOpacity='0.1' speed='0.9' color='black' />
        </div>
      )}

      <div className='absolute right-4   top-5'>
        <button
          onClick={(e) => {
            e.preventDefault()
            setCourseImg(null)
            setOpenModal(false)
          }}
          className='bg-[#eee] rounded-sm p-1'
        >
          <X size={25} strokeWidth={1.1} />
        </button>
      </div>
      <div>
        <h3 className='text-[1.2rem] font-medium'>Taking a course</h3>
        <p className='text-gray-500'>Let's help track your learning progress</p>
      </div>
      <div className='flex flex-col gap-1  w-full'>
        <label htmlFor='course' className='flex items-center gap-1.5'>
          <Bookmark size={16} />
          Course
        </label>
        <input
          type='text'
          id='course'
          name='course'
          placeholder='e.g., Intro to Design.'
          min='4'
          className='ml-0 border text-sm  focus:ring-0 border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl'
          required
        />
      </div>
      <div className='flex flex-col gap-1  w-full'>
        <label htmlFor='instructor' className='flex items-center gap-1.5'>
          <School size={16} />
          Instructor
        </label>
        <input
          type='text'
          id='instructor'
          name='instructor'
          placeholder='e.g., Jucy Lane'
          className='border text-sm focus:ring-0 border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl'
          required
        />
      </div>
      <div className='flex flex-col lg:flex-col justify-between gap-4'>
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor='rating' className='flex items-center gap-1'>
            <Star size={16} />
            Rating
          </label>
          <input
            type='number'
            id='rating'
            name='rating'
            placeholder='4.5'
            step='0.1'
            min='1'
            max='5'
            className='border focus:ring-0 text-sm border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl'
            required
          />
        </div>
        <div className='flex gap-1 '>
          <div className='flex gap-1 items-end'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='hrs' className='flex items-center gap-1'>
                <Hourglass size={16} />
                Hours
              </label>
              <input
                type='number'
                placeholder='2hrs'
                name='hrs'
                className='rounded-xl w-22 focus:ring-0 text-sm border-b border-gray-400 bg-inherit focus:border-dark focus-within:outline-none'
              />
            </div>
            <p className='text-xl pb-2 font-semibold text-gray-500'>:</p>
            <div className='flex flex-col gap-1'>
              <label htmlFor='hrs' className='flex items-center gap-1'>
                <Timer size={16} />
                Minutes
              </label>
              <input
                type='number'
                placeholder='4mins'
                name='mins'
                max='59'
                className='rounded-xl w-22 focus:ring-0 text-sm border-b border-gray-400 bg-inherit focus:border-dark focus-within:outline-none'
              />
            </div>
          </div>
        </div>
      </div>
      {previewUrl && (
        <div className='relative w-fit h-18  rounded-xl aspect-square object-cover'>
          <img src={previewUrl} alt='' className='h-full rounded-xl aspect-square object-cover' />
          <p
            onClick={() => setPreviewUrl(null)}
            className=' absolute top-0 -right-1 bg-white rounded-full p-0.5 ml-auto w-fit'
          >
            <X size={12} />
          </p>
        </div>
      )}

      <div
        className='flex flex-col gap-2  w-full overflow-hidden transition'
        style={{
          scale: previewUrl ? '0' : '1',
          height: previewUrl ? '0' : undefined
        }}
      >
        <div className='hidden'>
          <label htmlFor='course-image'>Select an image:</label>
          <input ref={previewRef} type='file' id='course-image' name='course-image' accept='image/*' />
        </div>
        <div className='flex gap-4 text-sm'>
          <div
            onClick={() => previewRef.current && previewRef.current.click()}
            className='w-full  p-3 hover:bg-blue-50 text-xs border-dashed text-gray-600 border text-center flex flex-col items-center border-gray-400 rounded-2xl'
          >
            <ImageDown className='mb-2' />
            <p>
              <a
                href=''
                onClick={(e) => e.preventDefault()}
                className='underline inline-block mr-1 focus:text-purple-500 text-blue-500'
              >
                Click to upload
              </a>
              or drag and drop
            </p>
            <p className='text-[0.6rem]'>Max, File Size: 15MB</p>
          </div>
        </div>
      </div>
      <div className=''>
        <button
          disabled={loading}
          className='bg-dark shadow-sm  disabled:opacity-80  flex items-center justify-center gap-1  text-white text-sm p-2.5 px-7 ml-auto    w-fit flex-1   rounded-2xl'
        >
          {loading ? 'Adding Course...' : 'Add Course'}
        </button>
      </div>
    </form>
  )
}

export default CourseForm
