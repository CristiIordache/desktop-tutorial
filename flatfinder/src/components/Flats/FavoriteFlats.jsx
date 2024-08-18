import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const FavoriteFlats = () => {
  const [favoriteFlats, setFavoriteFlats] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Step 1: Fetch all the favorite flat IDs for the current user
        const favoritesQuery = query(
          collection(db, "favorites"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(favoritesQuery);

        // Step 2: Fetch the apartment data for each favorite flatId
        const flatsData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const { flatId } = docSnapshot.data();
            const flatDoc = await getDoc(doc(db, "apartments", flatId));
            if (flatDoc.exists()) {
              return { id: flatId, ...flatDoc.data() };
            } else {
              console.error(`No apartment found for flatId: ${flatId}`);
              return null;
            }
          })
        );

        // Step 3: Filter out any null values (in case of missing data)
        setFavoriteFlats(flatsData.filter((flat) => flat !== null));
      } catch (error) {
        console.error("Error fetching favorite flats: ", error);
      }
    };

    fetchFavorites();
  }, [currentUser]);

  return (
    <div>
      <h1>Your Favorite Flats</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flat Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Street Name</TableCell>
            <TableCell>Street Number</TableCell>
            <TableCell>Has AC</TableCell>
            <TableCell>Year Built</TableCell>
            <TableCell>Rent Price</TableCell>
            <TableCell>Date Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favoriteFlats.map((flat) => (
            <TableRow key={flat.id}>
              <TableCell>{flat.flatName}</TableCell>
              <TableCell>{flat.city}</TableCell>
              <TableCell>{flat.streetName}</TableCell>
              <TableCell>{flat.streetNumber}</TableCell>
              <TableCell>{flat.hasAC ? "Yes" : "No"}</TableCell>
              <TableCell>{flat.yearBuilt}</TableCell>
              <TableCell>{flat.rentPrice}</TableCell>
              <TableCell>{flat.dateAvailable}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FavoriteFlats;
