import React from 'react'
import { useTranslation } from 'react-i18next'

import TitleTypography from 'libs/ui/components/TitleTypography'

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <div>
      <TitleTypography title={t('about.title')} />
    </div>
  )
}

export default AboutPage
