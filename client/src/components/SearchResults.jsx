import { Box, Container, Typography, MenuItem, Select } from "@mui/material";
import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Products from "./Products";
import io from "socket.io-client";

const SearchResults = () => {
  const [originalData, setOriginalData] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q").trim().toLowerCase();

  const socket = useRef(null);
  const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
  const clientId = useRef(null);

  function extractNumericValue(priceString) {
    return Number(priceString.replace(/[^0-9.-]+/g, ""));
  }

  function titleCase(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const sortByRelevance = useCallback(
    (bookA, bookB) => {
      let includesQueryA = bookA.title
        .toLowerCase()
        .includes(query.toLowerCase());
      let includesQueryB = bookB.title
        .toLowerCase()
        .includes(query.toLowerCase());

      if (includesQueryA && !includesQueryB) {
        return -1;
      } else if (!includesQueryA && includesQueryB) {
        return 1;
      } else {
        return 0;
      }
    },
    [query]
  );

  const sortByPriceLowToHigh = useCallback((a, b) => {
    let priceA = extractNumericValue(a.price);
    let priceB = extractNumericValue(b.price);
    return priceA - priceB;
  }, []);

  const sortByPriceHighToLow = useCallback((a, b) => {
    let priceA = extractNumericValue(a.price);
    let priceB = extractNumericValue(b.price);
    return priceB - priceA;
  }, []);

  const updateThumbnails = (thumbnailsArray) => {
    setThumbnails((prev) => {
      const updatedThumbnails = { ...prev };
      thumbnailsArray.forEach(({ id, thumbnail }) => {
        updatedThumbnails[id] = thumbnail;
      });
      return updatedThumbnails;
    });
  };

  const reapplyThumbnails = useCallback(
    (data) => {
      return data.map((item) => ({
        ...item,
        thumbnail: thumbnails[item.id] || item.thumbnail,
      }));
    },
    [thumbnails]
  );

  const sortAndSetData = useCallback(
    (dataToSort) => {
      switch (sortBy) {
        case "relevance":
          dataToSort.sort(sortByRelevance);
          break;
        case "priceLowToHigh":
          dataToSort.sort(sortByPriceLowToHigh);
          break;
        case "priceHighToLow":
          dataToSort.sort(sortByPriceHighToLow);
          break;
        default:
          break;
      }

      const dataWithThumbnails = reapplyThumbnails(dataToSort);
      setOriginalData(dataWithThumbnails);
    },
    [
      sortBy,
      reapplyThumbnails,
      sortByRelevance,
      sortByPriceLowToHigh,
      sortByPriceHighToLow,
    ]
  );

  socket.current = io(serverEndpoint);
  useEffect(() => {
    socket.current.on("connect", () => {
      clientId.current = socket.current.id;
      if (clientId.current && query.length > 0) {
        getData();
      } else {
        setOriginalData([]);
      }
    });

    const updateImagesData = (thumbnailsArray) => {
      setOriginalData((prevData) => {
        const updatedData = prevData.map((item) => {
          const thumbnailObject = thumbnailsArray.find(
            (thumb) => thumb.id === item.id
          );
          return thumbnailObject != undefined
            ? { ...item, thumbnail: thumbnailObject.thumbnail }
            : item;
        });

        return updatedData;
      });
    };

    socket.current.on("image-loaded", (data) => {
      const thumbnailsArray = data.thumbnails.thumbnail;
      updateImagesData(thumbnailsArray);
      updateThumbnails(thumbnailsArray);
      reapplyThumbnails(thumbnailsArray);
    });

    const getData = async () => {
      let cachedData = localStorage.getItem(query);
      if (cachedData) {
        cachedData = JSON.parse(cachedData);
        setOriginalData(cachedData);
        sortAndSetData(cachedData);
      } else {
        try {
          setLoading(true);
          const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

          const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              item: query,
              clientId: clientId.current,
            }),
          });
          let result = await response.json();
          result = result.filter((product) => product.valid);

          localStorage.setItem(query, JSON.stringify(result));

          setOriginalData(result);
          sortAndSetData(result);
        } catch (error) {
          console.error("Error in fetching the data:", error);
          setOriginalData([]);
        } finally {
          setLoading(false);
        }
      }
    };

    // Cleanup function for clearing localStorage on page unload
    const clearLocalStorage = () => {
      localStorage.removeItem(query);
    };

    // Add event listener for page unload
    window.addEventListener("beforeunload", clearLocalStorage);

    // Remove event listener on component unmount
    return () => {
      // socket.current.disconnect();
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, [query, sortBy, reapplyThumbnails, sortAndSetData]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Typography variant="h5">
          You searched for &ldquo;<b>{titleCase(query)}</b>&rdquo;
        </Typography>
        <Select
          value={sortBy}
          onChange={handleSortChange}
          displayEmpty
          inputProps={{ "aria-label": "Sort by" }}
        >
          <MenuItem value="relevance">Relevance</MenuItem>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
        </Select>
      </Box>

      {originalData.length > 0 && !loading ? (
        <Products productsData={originalData} />
      ) : loading ? (
        <Box
          sx={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "gray" }} variant="indeterminate" />
        </Box>
      ) : (
        <Typography variant="h5">No item found. Try something else.</Typography>
      )}
    </Container>
  );
};

export default SearchResults;
