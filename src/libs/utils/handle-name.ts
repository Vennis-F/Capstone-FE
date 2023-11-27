export const formatFullName = ({
  firstName,
  lastName,
  middleName,
}: {
  firstName: string
  lastName: string
  middleName: string
}) => `${lastName} ${middleName} ${firstName}`
