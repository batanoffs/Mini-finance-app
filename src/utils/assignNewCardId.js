import { cardService } from '../services/cardGenerationService'

export const assignNewCardId = async () => {
    let newCardId
    let checkMatch = true
    try {
        while (checkMatch) {
            newCardId = Math.floor(Math.random() * 100) + 1
            const getUsersCardIds = await cardService.getVirtualCardIds()
            if (getUsersCardIds && getUsersCardIds.message) return getUsersCardIds
            const usersCardIds = getUsersCardIds.map((id) => id.cardId)
            checkMatch = usersCardIds.includes(newCardId)
        }
        return newCardId
    } catch (error) {
        return error
    }
}
