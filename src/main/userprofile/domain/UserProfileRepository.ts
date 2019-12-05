import {UserProfile} from "./UserProfile";

/**
 * Dobrą praktyką jest uniezależnić się od bazy danych stosując warstwę abstrakcji jaką jest interfejs. Dzięki temu np. możemy podmienić łatwo bazę danych na implementację w pamięci i nie potrzebujemy
 * mongoDB do uruchomienia.
 */
export interface UserProfileRepository {
    findById(id: string): Promise<UserProfile | null>

    findByUsername(username: string): Promise<UserProfile | null>

    save(userProfile: UserProfile): Promise<UserProfile>

    update(userProfile: UserProfile): Promise<UserProfile>

}
