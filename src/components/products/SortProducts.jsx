"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function SortAndLimit({ searchParams, setFilter }) {
  return (
    <div className="flex gap-3">
      {/* SORT */}
      <Select 
    
        value={searchParams.get("sort") || "-createdAt"}
        onValueChange={(v) => setFilter("sort", v, { fetch: true })}
      >
        <SelectTrigger className="w-45 hover:cursor-pointer ">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem className={'hover:cursor-pointer'} value="-createdAt">Newest</SelectItem>
          <SelectItem className={'hover:cursor-pointer'} value="price">Price: Low → High</SelectItem>
          <SelectItem className={'hover:cursor-pointer'}  value="-price">Price: High → Low</SelectItem>
        </SelectContent>
      </Select>

      {/* LIMIT */}
      <Select
        value={searchParams.get("limit") || "12"}
        onValueChange={(v) => setFilter("limit", v, { fetch: true })}
      >
        <SelectTrigger className="w-30 hover:cursor-pointer">
          <SelectValue placeholder="Show" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem className={'hover:cursor-pointer'} value="8">8</SelectItem>
          <SelectItem className={'hover:cursor-pointer'} value="12">12</SelectItem>
          <SelectItem className={'hover:cursor-pointer'} value="20">20</SelectItem>
          <SelectItem className={'hover:cursor-pointer'} value="40">40</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
