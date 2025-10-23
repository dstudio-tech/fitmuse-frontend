"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  GalleryModelItemProps,
  PostItemProps,
  User,
  UserCollectionItemProps,
  UserFavouriteItemProps,
} from "@/data/props";
import { initialUserData } from "@/data/data";

export const BackendUrlContext = createContext<string>("");

export const CollectionsContext = createContext<{
  collections?: PostItemProps[];
  setCollections: React.Dispatch<
    React.SetStateAction<PostItemProps[] | undefined>
  >;
}>({ collections: [], setCollections: () => [] });

export const FavouritesContext = createContext<{
  favourites?: GalleryModelItemProps[];
  setFavourites: React.Dispatch<
    React.SetStateAction<GalleryModelItemProps[] | undefined>
  >;
}>({ favourites: [], setFavourites: () => [] });

export const MobileMenuContext = createContext<{
  mobileMenu: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  mobileMenu: false,
  setMobileMenu: () => Boolean,
});

export const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  jwt: string | undefined;
}>({
  user: initialUserData,
  setUser: () => {},
  jwt: "",
});

export default function SessionProvider({
  children,
  backendUrl,
  jwt,
}: Readonly<{
  children: React.ReactNode;
  backendUrl: string;
  jwt: string | undefined;
}>) {
  const [collections, setCollections] = useState<PostItemProps[]>();
  const [favourites, setFavourites] = useState<GalleryModelItemProps[]>();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState<User>(initialUserData);

  const getMeData = async (jwt: string) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/users/me?populate[sale][populate][service]=true&populate[collections][filters][publishedAt][$notNull]=true&populate[collections][sort][0]=createdAt:desc&populate[collections][populate][post_item][populate][cover]=true&populate[collections][populate][post_item][populate][model][populate][avatar]=true&populate[favourites][filters][publishedAt][$notNull]=true&populate[favourites][sort][0]=createdAt:desc&populate[favourites][populate][model][populate][thumbnail]=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const result = await response.json();
      setUser(result);
      // set user collections
      const currentUserCollections = result?.collections?.map(
        (collection: UserCollectionItemProps) => {
          return collection.post_item;
        }
      );
      if (result.access === "free") {
        setCollections(
          currentUserCollections.filters(
            (item: PostItemProps) => item.access === "free"
          )
        );
      }
      if (result.access === "premium") {
        setCollections(
          currentUserCollections.filters(
            (item: PostItemProps) => item.access !== "ultimate"
          )
        );
      }
      if (result.access === "ultimate") {
        setCollections(currentUserCollections);
      }
      // set user fav models
      const currentUserFavourites = result?.favourites?.map(
        (favourite: UserFavouriteItemProps) => {
          return favourite.model;
        }
      );
      setFavourites(currentUserFavourites);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jwt) {
      getMeData(jwt);
    } else {
      return;
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, jwt }}>
      <BackendUrlContext.Provider value={backendUrl}>
        <CollectionsContext.Provider value={{ collections, setCollections }}>
          <FavouritesContext.Provider value={{ favourites, setFavourites }}>
            <MobileMenuContext.Provider value={{ mobileMenu, setMobileMenu }}>
              {children}
            </MobileMenuContext.Provider>
          </FavouritesContext.Provider>
        </CollectionsContext.Provider>
      </BackendUrlContext.Provider>
    </UserContext.Provider>
  );
}
