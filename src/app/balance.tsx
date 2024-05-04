import { Badge, type BadgeProps } from '~/components/ui/badge'


const Balance = (props: BadgeProps) => {

  return (
  	<>
  		<Badge {...props} variant="solid">
  			2 credits
		</Badge>
  	</>
  )
	
}

export default Balance