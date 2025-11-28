import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isLoading?: boolean;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  isLoading = false,
}: CategoryFilterProps) {
  const theme = useTheme();

  const selectedCategoryName = categories.find(
    (cat) => cat.id === selectedCategory
  )?.name;

  return (
    <Box sx={{ mb: 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            disabled={isLoading}
            displayEmpty
            sx={{
              borderRadius: 5,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.divider,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="">
              <em>Todas as categorias</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedCategory && selectedCategoryName && (
          <Chip
            label={`Filtrando: ${selectedCategoryName}`}
            onDelete={() => onCategoryChange("")}
            color="primary"
            size="small"
            sx={{
              fontWeight: 500,
              "& .MuiChip-deleteIcon": {
                color: "inherit",
                "&:hover": {
                  color: theme.palette.primary.dark,
                },
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
}
