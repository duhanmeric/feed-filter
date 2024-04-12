export async function GET() {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <Products>
      <Product>
        <Product_ID>7631</Product_ID>
        <SKU>HEH-9133</SKU>
        <Name>On Cloud Nine Pillow</Name>
        <Product_URL>https://www.domain.com/product/heh-9133</Product_URL>
        <Price>24.99</Price>
        <Retail_Price>24.99</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/heh-9133_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Home>Home Decor>Pillows|Back In Stock</Category>
        <Category_ID>298|511</Category_ID>
        <Brand>FabDecor</Brand>
        <Child_SKU></Child_SKU>
        <Child_Price></Child_Price>
        <Color>White</Color>
        <Color_Family>White</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size></Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>4.2</Rating_Avg>
        <Rating_Count>8</Rating_Count>
        <Inventory_Count>21</Inventory_Count>
        <Date_Created>2018-03-03 17:41:13</Date_Created>
      </Product>
      <Product>
        <Product_ID>7615</Product_ID>
        <SKU>HEH-2245</SKU>
        <Name>Simply Sweet Blouse</Name>
        <Product_URL>https://www.domain.com/product/heh-2245</Product_URL>
        <Price>42</Price>
        <Retail_Price>59.95</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/heh-2245_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Clothing>Tops>Blouses|Clearance|Tops On Sale</Category>
        <Category_ID>285|512|604</Category_ID>
        <Brand>Entity Apparel</Brand>
        <Child_SKU>HEH-2245-RSWD-SM|HEH-2245-RSWD-MD|HEH-2245-THGR-SM|EH-2245-THGR-MD|HEH-2245-DKCH-SM|HEH-2245-DKCH-MD</Child_SKU>
        <Child_Price>42|59.99</Child_Price>
        <Color>Rosewood|Thyme Green|Dark Charcoal</Color>
        <Color_Family>Red|Green|Grey</Color_Family>
        <Color_Swatches>[{"color":"Rosewood", "family":"Red", "swatch_hex":"#65000b", "thumbnail":"/images/heh-2245-rswd-sm_600x600.png", "price":42}, {"color":"Thyme Green", "family":"Green", "swatch_img":"/swatches/thyme_green.png", "thumbnail":"/images/heh-2245-thgr-sm_600x600.png", "price":59.99}, {"color":"Dark Charcoal", "family":"Grey", "swatch_hex":"#36454f", "thumbnail":"/images/heh-2245-dkch-sm_600x600.png", "price":59.99}]</Color_Swatches>
        <Size>Small|Medium</Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season>Summer|Spring</Season>
        <Badges>Exclusive|Clearance</Badges>
        <Rating_Avg>4.5</Rating_Avg>
        <Rating_Count>10</Rating_Count>
        <Inventory_Count>8</Inventory_Count>
        <Date_Created>2018-03-20 22:24:21</Date_Created>
      </Product>
      <Product>
        <Product_ID>8100</Product_ID>
        <SKU>WKS-6016</SKU>
        <Name>Uptown Girl Blouse</Name>
        <Product_URL>https://www.domain.com/product/wks-6016</Product_URL>
        <Price>58</Price>
        <Retail_Price>89.95</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/wks-6016_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Clothing>Tops>Blouses</Category>
        <Category_ID>285</Category_ID>
        <Brand>Entity Apparel</Brand>
        <Child_SKU>WKS-6016-CORD-MD|WKS-6016-KEGR-MD</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Coral Red|Kelly Green</Color>
        <Color_Family>Red|Green</Color_Family>
        <Color_Swatches>[{"color":"Coral Red", "family":"Red", "swatch_img":"/swatches/coral_red.png", "thumbnail":"/images/wks-6016-cord-md_600x600.png", "price":58}, {"color":"Kelly Green", "family":"Green", "swatch_img":"/swatches/kelly_green.png", "thumbnail":"/images/wks-6016-kegr-md_600x600.png", "price":58}]</Color_Swatches>
        <Size>Medium</Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season>Summer|Spring</Season>
        <Badges>Exclusive</Badges>
        <Rating_Avg>4.2</Rating_Avg>
        <Rating_Count>11</Rating_Count>
        <Inventory_Count>9</Inventory_Count>
        <Date_Created>2018-03-16 21:55:28</Date_Created>
      </Product>
      <Product>
        <Product_ID>6489</Product_ID>
        <SKU>DKO-PROF</SKU>
        <Name>Knock Your Socks Off Lace-Up Heels</Name>
        <Product_URL>https://www.domain.com/product/dko-prof</Product_URL>
        <Price>38</Price>
        <Retail_Price>60</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/dko-prof_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Shoes>Heels>Lace-Up Heels|Featured Products|Shoes On Sale</Category>
        <Category_ID>310|719|605</Category_ID>
        <Brand>Spark Collective</Brand>
        <Child_SKU>DKO-PROF-BLK-5|DKO-PROF-BLK-5.5|DKO-PROF-BLK-6|DKO-PROF-BLK-7|DKO-PROF-BLK-7.5</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Black</Color>
        <Color_Family>Black</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size></Size>
        <Shoe_Size>5|5.5|6|7|7.5</Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges>Featured</Badges>
        <Rating_Avg>4.9</Rating_Avg>
        <Rating_Count>4</Rating_Count>
        <Inventory_Count>19</Inventory_Count>
        <Date_Created>2018-02-28 23:37:28</Date_Created>
      </Product>
      <Product>
        <Product_ID>7732</Product_ID>
        <SKU>HEH-2172</SKU>
        <Name>My Cup of Tea Sweater</Name>
        <Product_URL>https://www.domain.com/product/heh-2172</Product_URL>
        <Price>68</Price>
        <Retail_Price>68</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/heh-2172_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Clothing>Tops>Sweaters</Category>
        <Category_ID>277</Category_ID>
        <Brand>Enigma Clothes</Brand>
        <Child_SKU>HEH-2172-WHT-MD|HEH-2172-WHT-LG</Child_SKU>
        <Child_Price></Child_Price>
        <Color>White</Color>
        <Color_Family>White</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size>Medium|Large</Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season>Winter</Season>
        <Badges></Badges>
        <Rating_Avg>4.6</Rating_Avg>
        <Rating_Count>22</Rating_Count>
        <Inventory_Count>3</Inventory_Count>
        <Date_Created>2018-03-01 20:18:20</Date_Created>
      </Product>
      <Product>
        <Product_ID>7609</Product_ID>
        <SKU>HEH-2211</SKU>
        <Name>Walk On Out Slip On Sneakers</Name>
        <Product_URL>https://www.domain.com/product/heh-2211</Product_URL>
        <Price>34.99</Price>
        <Retail_Price>34.99</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/heh-2211_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Shoes>Sneakers>Slip-On Sneakers</Category>
        <Category_ID>302</Category_ID>
        <Brand>Temptation</Brand>
        <Child_SKU>HEH-2211-BSQ-6|HEH-2211-BSQ-7|HEH-2211-BSQ-8|HEH-2211-BSQ-9|HEH-2211-BSQ-10|HEH-2211-BSQ-10.5</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Bisque</Color>
        <Color_Family>Beige</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size></Size>
        <Shoe_Size>6|7|8|9|10|10.5</Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>3.9</Rating_Avg>
        <Rating_Count>5</Rating_Count>
        <Inventory_Count>2</Inventory_Count>
        <Date_Created>2018-03-20 22:15:34</Date_Created>
      </Product>
      <Product>
        <Product_ID>7675</Product_ID>
        <SKU>DKO-CAMEL</SKU>
        <Name>Warm Hearts Sweater</Name>
        <Product_URL>https://www.domain.com/product/dko-camel</Product_URL>
        <Price>54.49</Price>
        <Retail_Price>54.49</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/dko-camel_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Clothing>Tops>Sweaters|Back In Stock|Featured Products</Category>
        <Category_ID>277|511|719</Category_ID>
        <Brand>Legacy Apparel</Brand>
        <Child_SKU>DKO-CAMEL-GRY-SM</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Grey</Color>
        <Color_Family>Grey</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size>Small</Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season>Winter</Season>
        <Badges>Featured|Free Shipping</Badges>
        <Rating_Avg>5</Rating_Avg>
        <Rating_Count>2</Rating_Count>
        <Inventory_Count>20</Inventory_Count>
        <Date_Created>2018-03-19 20:53:04</Date_Created>
      </Product>
      <Product>
        <Product_ID>7463</Product_ID>
        <SKU>WKS-5026</SKU>
        <Name>Silver Lining Dress</Name>
        <Product_URL>https://www.domain.com/product/wks-5026</Product_URL>
        <Price>62</Price>
        <Retail_Price>62</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/wks-5026_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Dresses>Formal Dresses|All Dresses</Category>
        <Category_ID>220|201</Category_ID>
        <Brand>Temptation</Brand>
        <Child_SKU>WKS-5026-GRNP-XS|WKS-5026-GRNP-SM|WKS-5026-GRNP-MD</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Green Print</Color>
        <Color_Family>Green</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size>X-Small|Small|Medium</Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion>Formal</Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>5</Rating_Avg>
        <Rating_Count>9</Rating_Count>
        <Inventory_Count>0</Inventory_Count>
        <Date_Created>2018-03-01 19:59:05</Date_Created>
      </Product>
      <Product>
        <Product_ID>7677</Product_ID>
        <SKU>PCH-8738</SKU>
        <Name>Follow The Beat Sneakers</Name>
        <Product_URL>https://www.domain.com/product/pch-8738</Product_URL>
        <Price>32</Price>
        <Retail_Price>32</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/pch-8738_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Shoes>Sneakers>Slip-On Sneakers</Category>
        <Category_ID>302</Category_ID>
        <Brand>Fusion Fashion</Brand>
        <Child_SKU>PCH-8738-GRY-8|PCH-8738-GRY-9|PCH-8738-BLK-8|PCH-8738-BLK-9|PCH-8738-LEP-8|PCH-8738-LEP-9</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Grey|Black|Leopard</Color>
        <Color_Family>Grey|Black|Multi</Color_Family>
        <Color_Swatches>[{"color":"Grey", "family":"Grey", "swatch_hex":"#d3d3d3", "thumbnail":"/images/pch-8738-gry-8_600x600.png", "price":32}, {"color":"Black", "family":"Black", "swatch_hex":"#000000", "thumbnail":"/images/pch-8738-blk-8_600x600.png", "price":32}, {"color":"Leopard", "family":["Black","Multi"], "swatch_img":"/swatches/leopard.png", "thumbnail":"/images/pch-8738-lep-8_600x600.png", "price":32}]</Color_Swatches>
        <Size></Size>
        <Shoe_Size>8|9</Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>4.5</Rating_Avg>
        <Rating_Count>1</Rating_Count>
        <Inventory_Count>8</Inventory_Count>
        <Date_Created>2019-01-31 16:24:09</Date_Created>
      </Product>
      <Product>
        <Product_ID>8099</Product_ID>
        <SKU>PCH-8475</SKU>
        <Name>Cup of Joe Pillow</Name>
        <Product_URL>https://www.domain.com/product/pch-8475</Product_URL>
        <Price>36</Price>
        <Retail_Price>36</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/pch-8475_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Home>Home Decor>Pillows</Category>
        <Category_ID>298</Category_ID>
        <Brand>FabDecor</Brand>
        <Child_SKU></Child_SKU>
        <Child_Price></Child_Price>
        <Color>Seafoam Green</Color>
        <Color_Family>Green</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size></Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>4</Rating_Avg>
        <Rating_Count>1</Rating_Count>
        <Inventory_Count>18</Inventory_Count>
        <Date_Created>2018-02-28 19:03:26</Date_Created>
      </Product>
      <Product>
        <Product_ID>7425</Product_ID>
        <SKU>BCO-SK101</SKU>
        <Name>Burst Your Bubble Denim Jacket</Name>
        <Product_URL>https://www.domain.com/product/bco-sk101</Product_URL>
        <Price>84</Price>
        <Retail_Price>110</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/bco-sk101_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Clothing>Tops>Jackets|Clearance|Tops On Sale</Category>
        <Category_ID>279|512|604</Category_ID>
        <Brand>Zigzag Clothing</Brand>
        <Child_SKU>BCO-SK101-WSDM-LG</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Washed Denim</Color>
        <Color_Family>Denim</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size>Large</Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges>Clearance</Badges>
        <Rating_Avg>5</Rating_Avg>
        <Rating_Count>1</Rating_Count>
        <Inventory_Count>17</Inventory_Count>
        <Date_Created>2018-05-04 21:32:28</Date_Created>
      </Product>
      <Product>
        <Product_ID>8102</Product_ID>
        <SKU>HEH-2254</SKU>
        <Name>Walk It Out Heels</Name>
        <Product_URL>https://www.domain.com/product/heh-2254</Product_URL>
        <Price>32</Price>
        <Retail_Price>32</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/heh-2254_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Shoes>Heels>Pumps|New Arrivals|Featured Products</Category>
        <Category_ID>311|510|719</Category_ID>
        <Brand>Fusion Fashion</Brand>
        <Child_SKU>HEH-2254-BLK-6|HEH-2254-BLK-7|HEH-2254-BLK-8</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Black</Color>
        <Color_Family>Black</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size></Size>
        <Shoe_Size>6|7|8</Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges>Featured</Badges>
        <Rating_Avg>4.7</Rating_Avg>
        <Rating_Count>5</Rating_Count>
        <Inventory_Count>10</Inventory_Count>
        <Date_Created>2019-01-31 16:48:23</Date_Created>
      </Product>
      <Product>
        <Product_ID>9964</Product_ID>
        <SKU>BCO-2208</SKU>
        <Name>Word To The Wise Journal</Name>
        <Product_URL>https://www.domain.com/product/bco-2208</Product_URL>
        <Price>14.95</Price>
        <Retail_Price>14.95</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/bco-2208_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Home>Desk Decor>Journals</Category>
        <Category_ID>410</Category_ID>
        <Brand>Vintage Home</Brand>
        <Child_SKU></Child_SKU>
        <Child_Price></Child_Price>
        <Color>Blue</Color>
        <Color_Family>Blue</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size></Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>4</Rating_Avg>
        <Rating_Count>32</Rating_Count>
        <Inventory_Count>5</Inventory_Count>
        <Date_Created>2018-10-18 15:19:37</Date_Created>
      </Product>
      <Product>
        <Product_ID>10440</Product_ID>
        <SKU>KOI-721</SKU>
        <Name>Basic Beauty Off-The-Shoulder Dress</Name>
        <Product_URL>https://www.domain.com/product/koi-721</Product_URL>
        <Price>52</Price>
        <Retail_Price>78</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/koi-721_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Dresses>Off-The-Shoulder Dresses|Dresses On Sale</Category>
        <Category_ID>221|603</Category_ID>
        <Brand>Oasis</Brand>
        <Child_SKU>KOI-721-BLP-SM|KOI-721-BLP-MD</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Blue Print</Color>
        <Color_Family>Blue|Multi</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size>Small|Medium</Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion>Graduation</Occassion>
        <Season></Season>
        <Badges>Exclusive</Badges>
        <Rating_Avg>3.2</Rating_Avg>
        <Rating_Count>15</Rating_Count>
        <Inventory_Count>30</Inventory_Count>
        <Date_Created>2018-03-03 17:38:50</Date_Created>
      </Product>
      <Product>
        <Product_ID>6060</Product_ID>
        <SKU>VBH-V5102</SKU>
        <Name>Sunset Boulevard Pants</Name>
        <Product_URL>https://www.domain.com/product/vbh-v5102</Product_URL>
        <Price>44</Price>
        <Retail_Price>60</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/vbh-v5102_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Clothing>Bottoms>Pants|All Bottoms</Category>
        <Category_ID>236|204</Category_ID>
        <Brand>Monolith</Brand>
        <Child_SKU>VBH-V5102-WHT-24|VBH-V5102-WHT-25|VBH-V5102-WHT-26|VBH-V5102-WHT-27|VBH-V5102-BEG-24|VBH-V5102-BEG-25|VBH-V5102-BEG-26|VBH-V5102-BEG-27|VBH-V5102-BEG-30|VBH-V5102-BEG-31</Child_SKU>
        <Child_Price></Child_Price>
        <Color>White|Beige</Color>
        <Color_Family>White|Beige</Color_Family>
        <Color_Swatches>[{"color":"White", "family":"White", "swatch_hex":"#ffffff", "thumbnail":"/images/vbh-v5102-wht-24_600x600.png", "price":44}, {"color":"Beige", "family":"Beige", "swatch_hex":"#f5f5dc", "thumbnail":"/images/vbh-v5102-bge-24_600x600.png", "price":44}]</Color_Swatches>
        <Size></Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size>24|25|26|27|30|31</Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>3.8</Rating_Avg>
        <Rating_Count>33</Rating_Count>
        <Inventory_Count>1</Inventory_Count>
        <Date_Created>2018-02-28 23:57:53</Date_Created>
      </Product>
      <Product>
        <Product_ID>10448</Product_ID>
        <SKU>SKE-15460</SKU>
        <Name>Across The Pond Boots</Name>
        <Product_URL>https://www.domain.com/product/ske-15460</Product_URL>
        <Price>74.49</Price>
        <Retail_Price>74.49</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/ske-15460_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Shoes>Boots>Flat Boots</Category>
        <Category_ID>334</Category_ID>
        <Brand>Legacy Collective</Brand>
        <Child_SKU>SKE-15460-BRN-6|SKE-15460-BRN-7|SKE-15460-BRN-8.5</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Brown</Color>
        <Color_Family>Brown</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size></Size>
        <Shoe_Size>6|7|8.5</Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>5</Rating_Avg>
        <Rating_Count>6</Rating_Count>
        <Inventory_Count>0</Inventory_Count>
        <Date_Created>2018-06-25 18:09:07</Date_Created>
      </Product>
      <Product>
        <Product_ID>8137</Product_ID>
        <SKU>PCH-8705</SKU>
        <Name>Once Upon A Time Lace Dress</Name>
        <Product_URL>https://www.domain.com/product/pch-8705</Product_URL>
        <Price>50</Price>
        <Retail_Price>108</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/pch-8705_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Dresses>Lace Dresses|Dresses>All Dresses|New Arrivals</Category>
        <Category_ID>222|201|510</Category_ID>
        <Brand>Oasis</Brand>
        <Child_SKU>PCH-8705-WHT-SM|PCH-8705-WHT-MD|PCH-8705-WHT-LG|PCH-8705-BLK-SM|PCH-8705-BLK-MD|PCH-8705-BLK-LG|PCH-8705-LTBL-SM|PCH-8705-LTBL-MD|PCH-8705-LTBL-LG</Child_SKU>
        <Child_Price>50|72|108</Child_Price>
        <Color>White|Black|Light Blue</Color>
        <Color_Family>White|Black|Blue</Color_Family>
        <Color_Swatches>[{"color":"White", "family":"White", "swatch_hex":"#ffffff", "thumbnail":"/images/pch-8705-wht-sm_600x600.png", "price":50}, {"color":"Black", "family":"Black", "swatch_hex":"#000000", "thumbnail":"/images/pch-8705-blk-sm_600x600.png", "price":108}, {"color":"Light Blue", "family":"Blue", "swatch_img":"/swatches/light_blue.png", "thumbnail":"/images/pch-8705-ltbl-sm_600x600.png", "price":72}]</Color_Swatches>
        <Size>Small|Medium|Large</Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion>Party</Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>5</Rating_Avg>
        <Rating_Count>4</Rating_Count>
        <Inventory_Count>0</Inventory_Count>
        <Date_Created>2019-02-15 20:33:28</Date_Created>
      </Product>
      <Product>
        <Product_ID>10018</Product_ID>
        <SKU>PGF-ESS</SKU>
        <Name>Lovey Dovey Maxi Dress</Name>
        <Product_URL>https://www.domain.com/product/pgf-ess</Product_URL>
        <Price>68</Price>
        <Retail_Price>68</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/pgf-ess_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Dresses>Maxi Dresses|Dresses>All Dresses|New Arrivals</Category>
        <Category_ID>223|201|510</Category_ID>
        <Brand>Oasis</Brand>
        <Child_SKU>PGF-ESS-FUOR-SM|PGF-ESS-FUOR-MD|PGF-ESS-FUOR-LG|PGF-ESS-PRPT-SM|PGF-ESS-PRPT-MD|PGF-ESS-PRPT-LG</Child_SKU>
        <Child_Price></Child_Price>
        <Color>Fuschia Orange|Perfect Petals|Island Time</Color>
        <Color_Family>Orange|Pink|Yellow|Multi</Color_Family>
        <Color_Swatches>[{"color":"Fuschia Orange", "family":["Orange","Pink"], "swatch_img":"/swatches/fuschia_orange.png", "thumbnail":"/images/pgf-ess-fuor-sm_600x600.png", "price":68}, {"color":"Perfect Petals", "family":"Pink", "swatch_img":"/swatches/perfect_petals.png", "thumbnail":"/images/pgf-ess-prpt-sm_600x600.png", "price":68}, {"color":"Island Time", "family":["Yellow","Orange","Multi"], "swatch_img":"/swatches/island_time.png", "thumbnail":"/images/pgf-ess-istm-sm_600x600.png", "price":68}]</Color_Swatches>
        <Size>Small|Medium|Large</Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion>Party</Occassion>
        <Season></Season>
        <Badges></Badges>
        <Rating_Avg>4.8</Rating_Avg>
        <Rating_Count>12</Rating_Count>
        <Inventory_Count>24</Inventory_Count>
        <Date_Created>2019-02-20 21:38:02</Date_Created>
      </Product>
      <Product>
        <Product_ID>5670</Product_ID>
        <SKU>HEH-2223</SKU>
        <Name>Shot in the Dark Pillow</Name>
        <Product_URL>https://www.domain.com/product/heh-2223</Product_URL>
        <Price>40</Price>
        <Retail_Price>40</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/heh-2223_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Home>Home Decor>Pillows</Category>
        <Category_ID>298</Category_ID>
        <Brand>Vintage Home</Brand>
        <Child_SKU></Child_SKU>
        <Child_Price></Child_Price>
        <Color>Coral</Color>
        <Color_Family>Red</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size></Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges>Free Shipping</Badges>
        <Rating_Avg>4</Rating_Avg>
        <Rating_Count>3</Rating_Count>
        <Inventory_Count>8</Inventory_Count>
        <Date_Created>2018-03-01 20:28:28</Date_Created>
      </Product>
      <Product>
        <Product_ID>9020</Product_ID>
        <SKU>PGF-RIK</SKU>
        <Name>Diamonds Are Forever Pillow</Name>
        <Product_URL>https://www.domain.com/product/pgf-rik</Product_URL>
        <Price>36</Price>
        <Retail_Price>36</Retail_Price>
        <Thumbnail_URL>https://www.domain.com/images/pgf-rik_600x600.png</Thumbnail_URL>
        <Search_Keywords>lorem, ipsum, dolor, ...</Search_Keywords>
        <Description>Sociosqu facilisis duis ...</Description>
        <Category>Home>Home Decor>Pillows</Category>
        <Category_ID>298</Category_ID>
        <Brand>Vintage Home</Brand>
        <Child_SKU></Child_SKU>
        <Child_Price></Child_Price>
        <Color>Light Blue</Color>
        <Color_Family>Blue</Color_Family>
        <Color_Swatches></Color_Swatches>
        <Size></Size>
        <Shoe_Size></Shoe_Size>
        <Pants_Size></Pants_Size>
        <Occassion></Occassion>
        <Season></Season>
        <Badges>Free Shipping</Badges>
        <Rating_Avg>5</Rating_Avg>
        <Rating_Count>3</Rating_Count>
        <Inventory_Count>11</Inventory_Count>
        <Date_Created>2018-03-16 22:17:50</Date_Created>
      </Product>
    </Products>`;

    return new Response(xmlContent, { headers: { "Content-Type": "text/xml" } });
}
