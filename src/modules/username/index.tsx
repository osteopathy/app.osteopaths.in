import { doesUsernameExist, setUsername } from '@/actions';
import { UsernameForm as UI } from './ui';
import { UsernameFormDialog } from "./dialog"

export function UsernameForm() {
    return (
        <UI actions={{doesUsernameExist, setUsername}} />
    )
}
export {
    UsernameFormDialog
}