struct DictLookupResult {
    key: Int?;
    value: Slice?;
    found: Bool;
}
@name(idict_get_min?)
native nativeDictGetMin(dict: map[Int]Int, keyLen: Int): DictLookupResult;
@name(idict_get_next?)
native nativeDictGetNext(dict: map[Int]Int, keyLen: Int, key: Int): DictLookupResult;


fun serlializeAddress(wc: Int, hash: Int): Address {
    let addr: Slice = beginCell()
        .storeUint(4, 3) // addr_std 
        .storeInt(wc, 8)
        .storeUint(hash, 256)
        .asSlice();
    return addr.loadAddress();
}

struct ParsedAddress {
    wc: Int;
    hash: Int;
}
@name(parse_std_addr)
native parseAddress(addr: Address): ParsedAddress;

@name(muldivc)
native mulDivCeil(a: Int, b: Int, c: Int): Int;