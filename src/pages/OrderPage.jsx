import { useEffect, useState } from 'react'
import FormField from '../components/FormField'
import { validateOrderForm } from '../utils/formValidation'

const ORDER_DRAFT_STORAGE_KEY = 'kr5-react-shop-order-draft'

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  comment: ''
}

function OrderPage() {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [draftLoaded, setDraftLoaded] = useState(false)

  const errors = validateOrderForm(formData)
  const isFormValid = Object.keys(errors).length === 0

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(ORDER_DRAFT_STORAGE_KEY)

      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft)

        if (!parsedDraft || typeof parsedDraft !== 'object' || Array.isArray(parsedDraft)) {
          throw new Error('Некорректный черновик')
        }

        setFormData({
          name: typeof parsedDraft.name === 'string' ? parsedDraft.name : '',
          email: typeof parsedDraft.email === 'string' ? parsedDraft.email : '',
          phone: typeof parsedDraft.phone === 'string' ? parsedDraft.phone : '',
          comment: typeof parsedDraft.comment === 'string' ? parsedDraft.comment : ''
        })
      }
    } catch {
      localStorage.removeItem(ORDER_DRAFT_STORAGE_KEY)
    }

    setDraftLoaded(true)
  }, [])

  useEffect(() => {
    if (!draftLoaded) return

    const isEmpty = Object.values(formData).every(
      (value) => value.trim() === ''
    )

    if (isEmpty) {
      localStorage.removeItem(ORDER_DRAFT_STORAGE_KEY)
    } else {
      localStorage.setItem(
        ORDER_DRAFT_STORAGE_KEY,
        JSON.stringify(formData)
      )
    }
  }, [formData, draftLoaded])

  function handleFieldChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))

    setFormMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitted(true)

    if (!isFormValid) {
      setFormMessage('Проверьте поля формы.')
      return
    }

    console.table(formData)
    setFormMessage('Заявка подготовлена. Данные выведены в консоль.')
    localStorage.removeItem(ORDER_DRAFT_STORAGE_KEY)
    setFormData(initialFormData)
    setIsSubmitted(false)
  }

  function handleReset() {
    setFormData(initialFormData)
    setFormMessage('')
    setIsSubmitted(false)
    localStorage.removeItem(ORDER_DRAFT_STORAGE_KEY)
  }

  return (
    <main className="app-main">
      <section className="order-page">
        <div className="order-page__header">
          <h2>Заявка на консультацию</h2>
          <p>
            Заполните форму. Данные сохраняются как черновик в браузере.
          </p>
        </div>

        <form className="order-form" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Имя"
            name="name"
            value={formData.name}
            error={isSubmitted ? errors.name : ''}
            onChange={handleFieldChange}
            placeholder="Введите имя"
          />

          <FormField
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            error={isSubmitted ? errors.email : ''}
            onChange={handleFieldChange}
            placeholder="example@mail.ru"
          />

          <FormField
            label="Телефон"
            name="phone"
            type="tel"
            value={formData.phone}
            error={isSubmitted ? errors.phone : ''}
            onChange={handleFieldChange}
            placeholder="+7 999 000-00-00"
          />

          <FormField
            label="Комментарий"
            name="comment"
            value={formData.comment}
            error={isSubmitted ? errors.comment : ''}
            onChange={handleFieldChange}
            placeholder="Кратко опишите задачу"
            as="textarea"
          />

          <div className="order-form__actions">
            <button className="order-form__submit" type="submit">
              Отправить заявку
            </button>

            <button
              className="order-form__reset"
              type="button"
              onClick={handleReset}
            >
              Очистить черновик
            </button>
          </div>

          {formMessage && (
            <p className="form-message" aria-live="polite">
              {formMessage}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default OrderPage
